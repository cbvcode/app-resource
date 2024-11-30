package app_route

import (
	"github.com/gofiber/fiber/v2"
)

func AppRoutes(app *fiber.App) {
	app.Group("/v1/")
}
