<?php

require_once MODELS_PATH . 'User.php';
require_once REPOSITORIES_PATH . 'UserRepositoryInterface.php';
require_once DTO_PATH . 'UserRegistrationDTO.php';
require_once DTO_PATH . 'UserResponseDTO.php';
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
            error_log("Failed to send welcome email to {$savedUser->getEmail()}: " . $e->getMessage());
        }
        
        return new UserResponseDTO($savedUser->toArray());
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
    
    private function generateActivationToken(): string {
        return bin2hex(random_bytes(32));
    }
}
