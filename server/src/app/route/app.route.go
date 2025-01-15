package app_route

import (
	"github.com/gofiber/fiber/v2"
	"server/src/app/module/auth"
	"server/src/app/module/worker"
)

func AppRoutes(app *fiber.App) {
	v1 := app.Group("/v1/")
	v3 := app.Group("/v3/")

	module_auth.AuthModule(v1)

	module_worker.WorkerModule(v3)
}
