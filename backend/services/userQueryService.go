package services

import (
	"backend/models"

	"gorm.io/gorm"
)

type UserQueryService struct {
	DB *gorm.DB
}

// 全ユーザーを取得
func (service *UserQueryService) GetAllUsers() ([]models.User, error) {
	var users []models.User
	if err := service.DB.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}
