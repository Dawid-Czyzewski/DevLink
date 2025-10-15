<?php

require_once CONTROLLERS_PATH . 'BaseController.php';
require_once SERVICES_PATH . 'UserService.php';
require_once SERVICES_PATH . 'EmailService.php';
require_once DTO_PATH . 'UserRegistrationDTO.php';
require_once DTO_PATH . 'UserActivationDTO.php';
require_once EXCEPTIONS_PATH . 'ValidationException.php';
require_once EXCEPTIONS_PATH . 'DatabaseException.php';
require_once REPOSITORIES_PATH . 'UserRepository.php';

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
}
