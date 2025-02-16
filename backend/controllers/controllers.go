package controllers

import "backend/services"

type Controllers struct {
	UserController UserController
}

func NewControllers(userService services.UserService) *Controllers {
	return &Controllers{
		UserController: UserController{UserService: userService},
	}
}
