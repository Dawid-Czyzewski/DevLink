<?php

interface UserRepositoryInterface {
    public function save(User $user): User;
    public function findById(int $id): ?User;
    public function findByEmail(string $email): ?User;
    public function findByNickname(string $nickname): ?User;
    public function emailExists(string $email, ?int $excludeId = null): bool;
    public function nicknameExists(string $nickname, ?int $excludeId = null): bool;
    public function delete(int $id): bool;
    public function findByActivationToken(string $token): ?User;
    public function activateUser(int $id): bool;
    public function findAll(int $limit = 50, int $offset = 0): array;
    public function count(): int;
}
