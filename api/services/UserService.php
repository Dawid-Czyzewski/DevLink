<?php

require_once MODELS_PATH . 'User.php';
require_once REPOSITORIES_PATH . 'UserRepositoryInterface.php';
require_once DTO_PATH . 'UserRegistrationDTO.php';
require_once DTO_PATH . 'UserResponseDTO.php';
require_once DTO_PATH . 'UserActivationDTO.php';
require_once DTO_PATH . 'UserLoginDTO.php';
require_once VALIDATORS_PATH . 'UserRegistrationValidator.php';
require_once INTERFACES_PATH . 'EmailServiceInterface.php';

class UserService {
    
    private $userRepository;
    private $validator;
    private $emailService;
    
    public function __construct(UserRepositoryInterface $userRepository, EmailServiceInterface $emailService = null) {
        $this->userRepository = $userRepository;
        $this->validator = new UserRegistrationValidator();
        $this->emailService = $emailService ?? new EmailService();
    }
    
    public function registerUser(UserRegistrationDTO $dto): UserResponseDTO {
        $errors = $this->validator->validate($dto);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }
        
        if ($this->userRepository->emailExists($dto->email)) {
            throw new ValidationException(['email' => 'register.errors.emailExists']);
        }
        
        if ($this->userRepository->nicknameExists($dto->nickname)) {
            throw new ValidationException(['nickname' => 'register.errors.nicknameExists']);
        }
        
        $user = new User();
        $user->setNickname($dto->nickname)
             ->setEmail($dto->email)
             ->setPassword(password_hash($dto->password, PASSWORD_DEFAULT))
             ->setActivationToken($this->generateActivationToken())
             ->setIsActive(false);
        
        $savedUser = $this->userRepository->save($user);
        
        if (!$savedUser->getId()) {
            throw new DatabaseException('register.errors.databaseError');
        }
        
        try {
            $this->emailService->sendWelcomeEmail($savedUser->getEmail(), $savedUser->getNickname(), $savedUser->getActivationToken());
        } catch (Exception $e) {
        }
        
        return new UserResponseDTO($savedUser->toArray());
    }

    public function activateUser(UserActivationDTO $dto): array {
        try {
            $token = $dto->getToken();
            
            $user = $this->userRepository->findByActivationToken($token);
            
            if (!$user) {
                return [
                    'success' => false,
                    'message' => 'activate.errors.invalidToken'
                ];
            }
            
            if ($user->getIsActive()) {
                return [
                    'success' => false,
                    'message' => 'activate.errors.alreadyActivated'
                ];
            }
            
            $activated = $this->userRepository->activateUser($user->getId());
            
            if (!$activated) {
                return [
                    'success' => false,
                    'message' => 'activate.errors.activationFailed'
                ];
            }
            
            $user->setIsActive(true);
            $user->setActivationToken(null);
            
            return [
                'success' => true,
                'user' => $user,
                'message' => 'activate.successMessage'
            ];
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'activate.errors.unexpectedError'
            ];
        }
    }
    
    public function getUserById(int $id): ?UserResponseDTO {
        $user = $this->userRepository->findById($id);
        
        if (!$user) {
            return null;
        }
        
        return new UserResponseDTO($user->toArray());
    }
    
    public function getUserByEmail(string $email): ?UserResponseDTO {
        $user = $this->userRepository->findByEmail($email);
        
        if (!$user) {
            return null;
        }
        
        return new UserResponseDTO($user->toArray());
    }
    
    public function loginUser(UserLoginDTO $dto): array {
        try {
            $errors = $dto->validate();
            if (!empty($errors)) {
                return [
                    'success' => false,
                    'errors' => $errors
                ];
            }

            $user = $this->userRepository->findByEmail($dto->getEmail());
            
            if (!$user) {
                return [
                    'success' => false,
                    'message' => 'login.errors.invalidCredentials'
                ];
            }

            if (!$user->getIsActive()) {
                return [
                    'success' => false,
                    'message' => 'login.errors.accountNotActivated'
                ];
            }

            if (!password_verify($dto->getPassword(), $user->getPassword())) {
                return [
                    'success' => false,
                    'message' => 'login.errors.invalidCredentials'
                ];
            }

            session_start();
            $_SESSION['user_id'] = $user->getId();
            $_SESSION['user_email'] = $user->getEmail();
            $_SESSION['user_nickname'] = $user->getNickname();
            $_SESSION['login_time'] = time();

            if ($dto->getRememberMe()) {
                $_SESSION['remember_me'] = true;
                $_SESSION['expires'] = time() + (30 * 24 * 60 * 60);
            } else {
                $_SESSION['expires'] = time() + (24 * 60 * 60);
            }

            return [
                'success' => true,
                'user' => new UserResponseDTO($user->toArray()),
                'session_id' => session_id(),
                'message' => 'login.successMessage'
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'login.errors.unexpectedError'
            ];
        }
    }

    public function logoutUser(): bool {
        try {
            session_start();
            session_destroy();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function getCurrentUser(): ?UserResponseDTO {
        try {
            session_start();
            
            if (!isset($_SESSION['user_id']) || !isset($_SESSION['expires'])) {
                return null;
            }

            if (time() > $_SESSION['expires']) {
                session_destroy();
                return null;
            }

            $user = $this->userRepository->findById($_SESSION['user_id']);
            
            if (!$user || !$user->getIsActive()) {
                session_destroy();
                return null;
            }

            return new UserResponseDTO($user->toArray());

        } catch (Exception $e) {
            return null;
        }
    }

    private function generateActivationToken(): string {
        return bin2hex(random_bytes(32));
    }
}
