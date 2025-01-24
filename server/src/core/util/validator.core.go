package core_util

import (
	"github.com/go-playground/validator/v10"
	"server/src/config"
)

var validate = validator.New()

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
			Message: "bad request",
			Errors:  errors,
			Data:    nil,
		}
	}

	return nil
}
