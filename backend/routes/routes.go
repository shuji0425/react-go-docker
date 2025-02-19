package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, controllers *controllers.Controllers) {
	userController := controllers.UserController
	userRoutes := router.Group("/users")
	{
		userRoutes.GET("", userController.GetAllUsers)
		userRoutes.POST("/create", userController.CreateUser)
		userRoutes.PATCH("/update:id", userController.UpdateUser)
		userRoutes.DELETE("/delete:id", userController.DeleteUser)
	}
}
