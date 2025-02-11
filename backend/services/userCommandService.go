package services

import (
	"backend/models"

	"gorm.io/gorm"
)

type UserCommandService struct {
	DB *gorm.DB
}

// 新しいユーザーをDBに追加
func (s *UserCommandService) CreateUser(user *models.User) error {
	return s.DB.Create(user).Error
}
