package main

import (
	"backend/config"
	"backend/models"
	"backend/routes"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var db *gorm.DB

func main() {
	// 環境変数の読み込み
	err := config.LoadEnv()
	if err != nil {
		log.Fatalf("環境変数の読み込みに失敗しました: %v", err)
	}

	// DBの接続
	db, err = config.InitDB()
	if err != nil {
		log.Fatalf("データベース接続エラー: %v", err)
	}

	// マイグレーションを実行（テーブル作成）
	fmt.Println("マイグレーションを実行中...")
	err = db.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("マイグレーション失敗:", err)
	}

	fmt.Println("マイグレーション完了！")

	// Gin ルーターを作成
	r := gin.Default()

	// CORS設定
	r.Use(cors.Default())

	// ルーティングの設定
	routes.SetupRoutes(r, db)

	// ポート番号の取得
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// サーバーの起動
	fmt.Println("Server is running on port", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("サーバー起動エラー: %v", err)
	}
}
