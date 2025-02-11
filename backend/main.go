package main

import (
	"fmt"

	"github.com/gin-gonic/contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB
var err error

type User struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func main() {
	// DBへ接続
	dsn := "host=db user=user password=password dbname=mydb port=5432 sslmode=disable"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println("Failed to connect to the database")
	}

	// マイグレーション
	db.AutoMigrate(&User{})

	r := gin.Default()

	r.Use(cors.Default())

	// シンプルなAPI
	r.GET("/api/users", func(c *gin.Context) {
		var users []User
		if err := db.Find(&users).Error; err != nil {
			c.JSON(500, gin.H{"message": "Faild to fetch users"})

			return
		}

		c.JSON(200, users)
	})

	r.POST("/api/users", func(c *gin.Context) {
		var user User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(400, gin.H{"message": "Invalid input"})

			return
		}
		if err := db.Create(&user).Error; err != nil {
			c.JSON(500, gin.H{"message": "Failed to create user"})

			return
		}
		c.JSON(201, user)
	})

	// 8080ポートで起動
	r.Run(":8080")
}
