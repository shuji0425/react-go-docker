package controllers

import (
	"backend/models"
	"backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserCommandController struct {
	UserService *services.UserCommandService
}

// UserCommandControllerのインスタンスを作成
func NewUserCommandController(db *gorm.DB) *UserCommandController {
	return &UserCommandController{
		UserService: &services.UserCommandService{DB: db},
	}
}

func (uc *UserCommandController) CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "入力データが不正です"})

		return
	}

	// サービスそうを使ってユーザーを作成
	if err := uc.UserService.CreateUser(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "ユーザー作成エラー"})

		return
	}

	// 成功時は 201 Created を返却
	c.JSON(http.StatusCreated, user)
}
