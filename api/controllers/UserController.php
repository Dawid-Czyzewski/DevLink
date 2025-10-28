<?php

require_once CONTROLLERS_PATH . 'BaseController.php';
require_once SERVICES_PATH . 'UserService.php';
require_once SERVICES_PATH . 'EmailService.php';
require_once DTO_PATH . 'UserRegistrationDTO.php';
require_once DTO_PATH . 'UserActivationDTO.php';
require_once DTO_PATH . 'UserLoginDTO.php';
require_once DTO_PATH . 'UserProfileUpdateDTO.php';
require_once EXCEPTIONS_PATH . 'ValidationException.php';
require_once EXCEPTIONS_PATH . 'DatabaseException.php';
require_once REPOSITORIES_PATH . 'UserRepository.php';
require_once ENUMS_PATH . 'Category.php';
require_once ENUMS_PATH . 'ExperienceLevel.php';

class UserController extends BaseController {
    
    private $userService;
    
    public function __construct() {
        parent::__construct();

        $userRepository = new UserRepository($this->db);
        $emailService = new EmailService();
        $this->userService = new UserService($userRepository, $emailService);
    }
    
    public function register() {
        try {
            if (!Request::isPost()) {
                Response::error('Method not allowed', 405);
            }
            
            $data = Request::getJsonInput();
            $dto = new UserRegistrationDTO($data);
            
            $userResponse = $this->userService->registerUser($dto);
            
            Response::success([
                'user' => $userResponse->toArray()
            ], 'register.successMessage', 201);
            
        } catch (ValidationException $e) {
            Response::validationError($e->getErrors());
        } catch (DatabaseException $e) {
            Response::serverError($e->getMessage());
        } catch (Exception $e) {
            Response::serverError('register.errors.unexpectedError');
        }
    }

    public function activate() {
        try {
            if (!Request::isGet()) {
                Response::error('Method not allowed', 405);
            }
            
            $data = Request::get();
            $dto = new UserActivationDTO($data);
            
            $validationErrors = $dto->validate();
            if (!empty($validationErrors)) {
                throw new ValidationException($validationErrors);
            }
            
            $result = $this->userService->activateUser($dto);
            
            if ($result['success']) {
                Response::success([
                    'user' => $result['user']->toArray()
                ], 'activate.successMessage', 200);
            } else {
                Response::error($result['message'], 400);
            }
            
        } catch (ValidationException $e) {
            Response::validationError($e->getErrors());
        } catch (DatabaseException $e) {
            Response::serverError($e->getMessage());
        } catch (Exception $e) {
            Response::serverError('activate.errors.unexpectedError');
        }
    }

    public function login() {
        try {
            if (!Request::isPost()) {
                Response::error('Method not allowed', 405);
            }
            
            $data = Request::getJsonInput();
            
            if (empty($data)) {
                Response::error('Invalid request data', 400);
            }
            
            $dto = new UserLoginDTO($data);
            $result = $this->userService->loginUser($dto);
            
            if ($result['success']) {
                Response::success([
                    'user' => $result['user']->toArray(),
                    'session_id' => $result['session_id']
                ], $result['message'], 200);
            } else {
                if (isset($result['errors'])) {
                    Response::validationError($result['errors']);
                } else {
                    Response::error($result['message'], 401);
                }
            }
            
        } catch (ValidationException $e) {
            Response::validationError($e->getErrors());
        } catch (DatabaseException $e) {
            Response::serverError($e->getMessage());
        } catch (Exception $e) {
            Response::serverError('login.errors.unexpectedError');
        }
    }

    public function logout() {
        try {
            if (!Request::isPost()) {
                Response::error('Method not allowed', 405);
            }
            
            $result = $this->userService->logoutUser();
            
            if ($result) {
                Response::success([], 'logout.successMessage', 200);
            } else {
                Response::error('logout.errorMessage', 500);
            }
            
        } catch (Exception $e) {
            Response::serverError('logout.errors.unexpectedError');
        }
    }

    public function me() {
        try {
            if (!Request::isGet()) {
                Response::error('Method not allowed', 405);
            }
            
            $user = $this->userService->getCurrentUser();
            
            if ($user) {
                Response::success([
                    'user' => $user->toArray()
                ], 'auth.userFound', 200);
            } else {
                Response::error('auth.notAuthenticated', 401);
            }
            
        } catch (Exception $e) {
            Response::serverError('auth.errors.unexpectedError');
        }
    }

    public function getUserById() {
        try {
            if (!Request::isGet()) {
                Response::error('Method not allowed', 405);
            }
            
            $userId = Request::get('userId');
            
            if (!$userId) {
                Response::error('User ID is required', 400);
            }
            
            $user = $this->userService->getUserById($userId);
            
                if ($user) {
                    Response::success([
                        'user' => $user->toPublicArray()
                    ], 'auth.userFound', 200);
                } else {
                    Response::error('User not found', 404);
                }
            
        } catch (Exception $e) {
            Response::serverError('auth.errors.unexpectedError');
        }
    }

    public function updateProfile() {
        try {
            if (!Request::isPost()) {
                Response::error('Method not allowed', 405);
            }
            
            $data = Request::getJsonInput();
            
            if (empty($data)) {
                Response::error('No data received', 400);
            }
            
            $dto = new UserProfileUpdateDTO($data);
            $result = $this->userService->updateProfile($dto);
            
            if ($result['success']) {
                Response::success([
                    'user' => $result['user']->toArray()
                ], 'editProfile.successMessage', 200);
            } else {
                Response::error($result['message'], 400);
            }
            
        } catch (ValidationException $e) {
            Response::validationError($e->getErrors());
        } catch (DatabaseException $e) {
            Response::serverError($e->getMessage());
        } catch (Exception $e) {
            print_r("Profile update error: " . $e->getMessage());
            print_r("Stack trace: " . $e->getTraceAsString());
            Response::serverError('editProfile.errors.unexpectedError');
        }
    }

    public function getProfileOptions() {
        try {
            if (!Request::isGet()) {
                Response::error('Method not allowed', 405);
            }
            
            $options = [
                'categories' => Category::getAllLabels(),
                'experienceLevels' => ExperienceLevel::getAllLabels()
            ];
            
            Response::success($options, 'Profile options retrieved successfully', 200);
            
        } catch (Exception $e) {
            Response::serverError('An unexpected error occurred while retrieving profile options');
        }
    }

    public function forgotPassword() {
        try {
            if (!Request::isPost()) {
                Response::error('Method not allowed', 405);
            }
            
            $data = Request::getJsonInput();
            
            if (empty($data) || !isset($data['email'])) {
                Response::error('Email is required', 400);
            }
            
            $result = $this->userService->forgotPassword($data['email']);
            
            if ($result['success']) {
                Response::success([], $result['message'], 200);
            } else {
                Response::error($result['message'], 400);
            }
            
        } catch (Exception $e) {
            Response::serverError('forgotPassword.errors.unexpectedError');
        }
    }

    public function resetPassword() {
        try {
            if (!Request::isPost()) {
                Response::error('Method not allowed', 405);
            }
            
            $data = Request::getJsonInput();
            
            if (empty($data) || !isset($data['token']) || !isset($data['password'])) {
                Response::error('Token and password are required', 400);
            }
            
            $result = $this->userService->resetPassword($data['token'], $data['password']);
            
            if ($result['success']) {
                Response::success([], $result['message'], 200);
            } else {
                if (isset($result['errors'])) {
                    Response::validationError($result['errors']);
                } else {
                    Response::error($result['message'], 400);
                }
            }
        } catch (Exception $e) {
            Response::serverError('resetPassword.errors.unexpectedError');
        }
    }
}
