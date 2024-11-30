package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/encryptcookie"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/swagger"
	_ "server/docs"
	"server/src/core/config"
)

func init() {
	core_config.InitEnv()
}

// @title			Server API
// @version		1.0
// @description	Server docs
// @host			localhost:4000
func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{AllowOrigins: core_config.AllowOrigins}))
	app.Use(helmet.New())
	app.Use(encryptcookie.New(encryptcookie.Config{Key: core_config.CookieSecret}))
	app.Use(compress.New(compress.Config{Level: compress.LevelBestSpeed}))
	app.Use(recover.New())
	app.Use(logger.New())

	app.Get("/", monitor.New(monitor.Config{Title: "Server Metrics"}))
	app.Get("/docs/*", swagger.HandlerDefault)

	err := app.Listen(fmt.Sprintf(":%v", core_config.Port))
	if err != nil {
		panic(err)
	}
}
