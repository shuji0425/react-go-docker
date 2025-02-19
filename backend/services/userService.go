package services

import (
	"backend/models"
	"errors"

	"github.com/mitchellh/mapstructure"
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
func (service *UserService) UpdateUser(id uint, updatedUser map[string]interface{}) (*models.User, error) {
	var user models.User
	if err := service.DB.First(&user, id).Error; err != nil {
		return nil, err
	}

	// データのマッピング
	var tempUser models.User
	if err := mapstructure.Decode(updatedUser, &tempUser); err != nil {
		return nil, errors.New("データのマッピングに失敗しました")
	}

	if err := service.DB.Model(&user).Updates(updatedUser).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

// 削除
func (service *UserService) DeleteUser(id uint) error {
	if err := service.DB.Delete(&models.User{}, id).Error; err != nil {
		return err
	}

	return nil
}
