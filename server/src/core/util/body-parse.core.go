package core_util

import (
	"github.com/gofiber/fiber/v2"
	"server/src/config"
)

func ParseBody(ctx *fiber.Ctx, body interface{}) *config.ResDto {
	if err := ctx.BodyParser(body); err != nil {
		return &config.ResDto{
			Success: false,
			Message: "invalid request body",
			Errors:  nil,
			Data:    nil,
		}
	}

	return nil
}
