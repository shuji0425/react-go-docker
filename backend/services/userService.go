package services

import (
	"backend/models"

	"gorm.io/gorm"
)

type UserService struct {
	DB *gorm.DB
}

// 全件取得
func (service *UserService) GetAllUsers() ([]models.User, error) {
	var users []models.User
	result := service.DB.Find(&users)
	return users, result.Error
}

// id指定の取得
func (service *UserService) GetUserById(id uint) (*models.User, error) {
	var user models.User
	result := service.DB.First(&user, id)
	return &user, result.Error
}

// 登録
func (service *UserService) CreateUser(user *models.User) (*models.User, error) {
	result := service.DB.Create(&user)
	return user, result.Error
}

// 更新
func (service *UserService) UpdateUser(user *models.User) (*models.User, error) {
	result := service.DB.Save(&user)
	return user, result.Error
}

// 削除
func (service *UserService) DeleteUser(id uint) error {
	result := service.DB.Delete(&models.User{}, id)
	return result.Error
}
