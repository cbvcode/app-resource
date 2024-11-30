package core_util

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"server/src/config"
)

var validate = validator.New()

// Validator field validator
func Validator(body interface{}) *config.ResDto {
	err := validate.Struct(body)
	var errors []*config.ErrDto

	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var el config.ErrDto
			el.Field = err.Field()
			el.Value = err.Param()
			errors = append(errors, &el)
		}
		return &config.ResDto{
			Success: false,
			Errors:  errors,
			Data:    nil,
		}
	}

	return nil
}

// ParseBody parsing the body.
func ParseBody(ctx *fiber.Ctx, body interface{}) *config.ResDto {
	if err := ctx.BodyParser(body); err != nil {
		return &config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "", Value: "Invalid request body"}},
			Data:    nil,
		}
	}

	return nil
}
