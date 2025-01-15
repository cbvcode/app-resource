package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/basicauth"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/swagger"
	_ "server/docs"
	_ "server/src/app/migrate"
	"server/src/app/route"
	"server/src/config"
	"server/src/core/cache"
	"server/src/core/db"
)

func init() {
	config.InitEnv()
	core_cache.InitStore()

	core_db.InitDb()
	//migrate.InitMigrateDb()
}

// @title			Server API
// @version		1.0
// @description	Server docs
func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{AllowOrigins: config.AllowOrigins}))
	app.Use(helmet.New())
	app.Use(compress.New(compress.Config{Level: compress.LevelBestSpeed}))
	app.Use(recover.New())
	app.Use(logger.New())

	app.Get("/", monitor.New(monitor.Config{Title: "Server Metrics"}))

	authConfig := basicauth.Config{Users: map[string]string{"admin": "password"}}
	app.Use("/docs", basicauth.New(authConfig))
	app.Get("/docs/*", swagger.HandlerDefault)

	app_route.AppRoutes(app)

	err := app.Listen(fmt.Sprintf(":%v", config.Port))
	if err != nil {
		panic(err)
	}
}
