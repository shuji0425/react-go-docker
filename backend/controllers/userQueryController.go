package controllers

import (
	"backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserQueryController struct {
	UserService *services.UserQueryService
}

func NewUserQueryController(db *gorm.DB) *UserQueryController {
	return &UserQueryController{
		UserService: &services.UserQueryService{DB: db},
	}
}

// 全ユーザーを取得する
func (uc *UserQueryController) GetAllUsers(c *gin.Context) {
	users, err := uc.UserService.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "ユーザー取得エラー"})

		return
	}
	c.JSON(http.StatusOK, users)
}
