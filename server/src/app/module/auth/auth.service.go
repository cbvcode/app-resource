package module_auth

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"server/src/app/repo/user"
	"server/src/config"
	"server/src/core/db"
	"server/src/core/jwt"
	"server/src/core/pass"
	"server/src/core/validator"
)

// SignInService sign in user
func SignInService(ctx *fiber.Ctx) error {
	var body repo_user.SignInReqDto
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "", Value: "Invalid request body"}},
			Data:    nil,
		})
	}

	if errors := core_validator.Validator(body); errors != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Errors:  errors,
			Data:    nil,
		})
	}

	var user repo_user.UserModel
	if err := core_db.DbInstance.Where("email = ?", body.Email).First(&user).Error; err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(config.ResDto{
			Errors: []*config.ErrDto{{Field: "", Value: "Incorrect email or password"}},
			Data:   nil,
		})
	}

	if !core_pass.VerifyPass(body.Password, user.Password) {
		return ctx.Status(fiber.StatusNotFound).JSON(config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "", Value: "Incorrect email or password"}},
			Data:    nil,
		})
	}

	if err := core_jwt.CreateToken(ctx, core_jwt.TokenData{
		ID:       user.ID,
		Email:    user.Email,
		Username: user.Username,
	}); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "", Value: "Failed to create token"}},
			Data:    nil,
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(config.ResDto{
		Success: true,
		Errors:  nil,
		Data:    "Welcome!",
	})
}

// SignUpService sign up user
func SignUpService(ctx *fiber.Ctx) error {
	var body repo_user.SignUpReqDto
	if err := ctx.BodyParser(&body); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "", Value: "Invalid request body"}},
			Data:    nil,
		})
	}

	if errors := core_validator.Validator(body); errors != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Errors:  errors,
			Data:    nil,
		})
	}

	if body.Password != body.ConfirmPassword {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "confirmPassword", Value: "Passwords do not match"}},
			Data:    nil,
		})
	}

	var existingUser repo_user.UserModel
	if err := core_db.DbInstance.Where("email = ?", body.Email).First(&existingUser).Error; err == nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "email", Value: "Email already in use"}},
			Data:    nil,
		})
	}

	newUser := &repo_user.UserModel{
		Email:    body.Email,
		Username: body.Username,
		Password: core_pass.HashPass(body.Password),
	}

	if err := core_db.DbInstance.Create(newUser).Error; err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "", Value: fmt.Sprintf("Failed to create user: %s", err)}},
			Data:    nil,
		})
	}

	if err := core_jwt.CreateToken(ctx, core_jwt.TokenData{
		ID:       newUser.ID,
		Username: newUser.Username,
		Email:    newUser.Email,
	}); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "", Value: fmt.Sprintf("Failed to create user: %s", err)}},
			Data:    nil,
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(config.ResDto{
		Success: true,
		Errors:  nil,
		Data:    "Welcome!",
	})
}

// SignOutService sign out user
func SignOutService(ctx *fiber.Ctx) error {
	core_jwt.DeleteToken(ctx)

	return ctx.Status(fiber.StatusOK).JSON(config.ResDto{
		Success: true,
		Errors:  nil,
		Data:    "Good buy!",
	})
}

// ProfileService user profile
func ProfileService(ctx *fiber.Ctx) error {
	user := core_jwt.GetTokenInfo(ctx)

	profile := &repo_user.UserProfileDto{}
	if err := core_db.DbInstance.Model(repo_user.UserModel{}).Where("id = ?", user.ID).First(profile).Error; err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "", Value: "User not found"}},
			Data:    "",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(repo_user.UserProfileResDto{
		Success: true,
		Errors:  nil,
		Data:    profile,
	})
}
