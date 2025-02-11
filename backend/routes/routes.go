package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(r *gin.Engine, db *gorm.DB) {
	// Get用
	userQueryController := controllers.NewUserQueryController(db)
	r.GET("/api/users", userQueryController.GetAllUsers)

	// POST用
	userCommandController := controllers.NewUserCommandController(db)
	r.POST("api/users", userCommandController.CreateUser)

}
