<?php

class Chat {
    private $id;
    private $announcementId;
    private $participants;
    private $createdAt;
    private $updatedAt;

    public function __construct($data = []) {
        if (!empty($data)) {
            $this->id = $data['id'] ?? null;
            $this->announcementId = $data['announcement_id'] ?? null;
            $this->participants = $data['participants'] ?? [];
            $this->createdAt = $data['created_at'] ?? null;
            $this->updatedAt = $data['updated_at'] ?? null;
        }
    }

    public function getId() {
        return $this->id;
    }

    public function getAnnouncementId() {
        return $this->announcementId;
    }

    public function getParticipants() {
        return $this->participants;
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function getUpdatedAt() {
        return $this->updatedAt;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function setAnnouncementId($announcementId) {
        $this->announcementId = $announcementId;
        return $this;
    }

    public function setParticipants($participants) {
        $this->participants = $participants;
        return $this;
    }

    public function setCreatedAt($createdAt) {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function setUpdatedAt($updatedAt) {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    public function addParticipant($userId) {
        if (!in_array($userId, $this->participants)) {
            $this->participants[] = $userId;
        }
        return $this;
    }

    public function removeParticipant($userId) {
        $this->participants = array_filter($this->participants, function($id) use ($userId) {
            return $id != $userId;
        });
        return $this;
    }

    public function isParticipant($userId) {
        return in_array($userId, $this->participants);
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
}
