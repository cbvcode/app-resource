package app_route

import (
	"github.com/gofiber/fiber/v2"
	"server/src/app/module/auth"
)

func AppRoutes(app *fiber.App) {
	v1 := app.Group("/v1/")

	module_auth.AuthModule(v1)
}
