package module_worker

import (
	"github.com/gofiber/fiber/v2"
)

func WorkerModule(app fiber.Router) {
	WorkerRoute(app)
}

// WorkerRoute
//
//	@Description	worker
//	@Tags			Worker
//	@Accept			json
//	@Produce		json
//	@Success		200		{object}	config.ResDto
//	@Router			/v3/worker-country [get]
func WorkerRoute(app fiber.Router) {
	app.Get("worker-country", func(ctx *fiber.Ctx) error {
		return WorkerService(ctx)
	})
}
