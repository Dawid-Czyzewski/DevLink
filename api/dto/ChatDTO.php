<?php

class ChatDTO {
    public $id;
    public $announcementId;
    public $participants;
    public $createdAt;
    public $updatedAt;

    public function __construct($data = []) {
        $this->id = $data['id'] ?? null;
        $this->announcementId = $data['announcement_id'] ?? $data['announcementId'] ?? null;
        $this->participants = $data['participants'] ?? [];
        $this->createdAt = $data['created_at'] ?? $data['createdAt'] ?? null;
        $this->updatedAt = $data['updated_at'] ?? $data['updatedAt'] ?? null;
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'announcement_id' => $this->announcementId,
            'participants' => $this->participants,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt
        ];
    }

    public function toJson() {
        return json_encode($this->toArray());
    }

    public function validate() {
        $errors = [];

        if (empty($this->announcementId)) {
            $errors['announcement_id'] = 'Announcement ID is required';
        }

        if (!is_array($this->participants)) {
            $errors['participants'] = 'Participants must be an array';
        }

        return $errors;
    }
}
