<?php

class UserRegistrationValidator {

    public function validate(UserRegistrationDTO $dto) {
        $errors = [];

        if (empty($dto->nickname)) {
            $errors['nickname'] = 'register.errors.nicknameRequired';
        }
        
        if (empty($dto->email)) {
            $errors['email'] = 'register.errors.emailRequired';
        } elseif (!filter_var($dto->email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'register.errors.emailInvalid';
        }
        
        if (empty($dto->password)) {
            $errors['password'] = 'register.errors.passwordRequired';
        } elseif (strlen($dto->password) < 8) {
            $errors['password'] = 'register.errors.passwordMinLength';
        } elseif (strlen($dto->password) > 255) {
            $errors['password'] = 'register.errors.passwordMaxLength';
        }
        
        if (empty($dto->confirmPassword)) {
            $errors['confirmPassword'] = 'register.errors.confirmPasswordRequired';
        } elseif ($dto->password !== $dto->confirmPassword) {
            $errors['confirmPassword'] = 'register.errors.passwordsMismatch';
        }
        
        if (!$dto->acceptTerms) {
            $errors['acceptTerms'] = 'register.errors.termsRequired';
        }
        
        return $errors;
    }
}
