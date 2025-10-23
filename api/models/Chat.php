<?php

class Chat {
    private $id;
    private $announcementId;
    private $announcementTitle;
    private $announcementAuthorId;
    private $chatInitiatorNickname;
    private $announcementOwnerNickname;
    private $participants;
    private $createdAt;
    private $updatedAt;

    public function __construct($data = []) {
        if (!empty($data)) {
            $this->id = $data['id'] ?? null;
            $this->announcementId = $data['announcement_id'] ?? null;
            $this->announcementTitle = $data['announcement_title'] ?? null;
            $this->announcementAuthorId = $data['announcement_author_id'] ?? null;
            $this->chatInitiatorNickname = $data['chat_initiator_nickname'] ?? null;
            $this->announcementOwnerNickname = $data['announcement_owner_nickname'] ?? null;
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

    public function getAnnouncementTitle() {
        return $this->announcementTitle;
    }

    public function getAnnouncementAuthorId() {
        return $this->announcementAuthorId;
    }

    public function getChatInitiatorNickname() {
        return $this->chatInitiatorNickname;
    }

    public function getAnnouncementOwnerNickname() {
        return $this->announcementOwnerNickname;
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
        $userId = (int) $userId;
        $participants = array_map('intval', $this->participants);
        return in_array($userId, $participants);
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'announcement_id' => $this->announcementId,
            'announcement_title' => $this->announcementTitle,
            'announcement_author_id' => $this->announcementAuthorId,
            'chat_initiator_nickname' => $this->chatInitiatorNickname,
            'announcement_owner_nickname' => $this->announcementOwnerNickname,
            'participants' => $this->participants,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt
        ];
    }

    public function toJson() {
        return json_encode($this->toArray());
    }
}
