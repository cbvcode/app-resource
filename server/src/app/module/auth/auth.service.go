package module_auth

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"server/src/app/repo/user"
	"server/src/config"
	"server/src/core/db"
	"server/src/core/jwt"
	"server/src/core/pass"
	"server/src/core/util"
)

func SignInService(ctx *fiber.Ctx) error {
	var body repo_user.SignInReqDto
	if err := core_util.ParseBody(ctx, &body); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(err)
	}

	if err := core_util.Validator(body); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(err)
	}

	user := &repo_user.UserModel{}
	if err := core_db.Db.Model(repo_user.UserModel{}).Where("email = ?", body.Email).First(user).Error; err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Message: "Incorrect email or password",
			Errors:  nil,
			Data:    nil,
		})
	}

	if !core_pass.Verify(body.Password, user.Password) {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Message: "Incorrect email or password",
			Errors:  nil,
			Data:    nil,
		})
	}

	if err := core_jwt.CreateToken(ctx, core_jwt.TokenData{ID: user.ID}); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(config.ResDto{
			Success: false,
			Message: "Failed to create token",
			Errors:  nil,
			Data:    nil,
		})
	}

	repo_user.DelUserProfileCache(user.ID)

	return ctx.Status(fiber.StatusOK).JSON(config.ResDto{
		Success: true,
		Message: "Welcome!",
		Errors:  nil,
		Data:    nil,
	})
}

func SignUpService(ctx *fiber.Ctx) error {
	var body repo_user.SignUpReqDto
	if err := core_util.ParseBody(ctx, &body); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(err)
	}

	if err := core_util.Validator(body); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(err)
	}

	if body.Password != body.ConfirmPassword {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Message: "Passwords do not match",
			Errors:  []*config.ErrDto{{Field: "confirmPassword", Value: "Passwords do not match"}},
			Data:    nil,
		})
	}

	existingUser := &repo_user.UserProfileDto{}
	if err := core_db.Db.Model(repo_user.UserModel{}).Where("email = ?", body.Email).First(existingUser).Error; err == nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Message: "Email already in use",
			Errors:  []*config.ErrDto{{Field: "email", Value: "Email already in use"}},
			Data:    nil,
		})
	}

	newUser := &repo_user.UserModel{
		Email:    body.Email,
		Username: body.Username,
		Password: core_pass.Generate(body.Password),
	}

	if err := core_db.Db.Model(repo_user.UserModel{}).Create(newUser).Error; err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(config.ResDto{
			Success: false,
			Message: fmt.Sprintf("Failed to create user: %s", err),
			Errors:  nil,
			Data:    nil,
		})
	}

	if err := core_jwt.CreateToken(ctx, core_jwt.TokenData{ID: newUser.ID}); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(config.ResDto{
			Success: false,
			Message: fmt.Sprintf("Failed to create user: %s", err),
			Errors:  nil,
			Data:    nil,
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(config.ResDto{
		Success: true,
		Message: "Welcome!",
		Errors:  nil,
		Data:    nil,
	})
}

func SignOutService(ctx *fiber.Ctx) error {
	userId := core_jwt.DeleteToken(ctx)

	repo_user.DelUserProfileCache(userId)

	return ctx.Status(fiber.StatusOK).JSON(config.ResDto{
		Success: true,
		Message: "Good buy!",
		Errors:  nil,
		Data:    nil,
	})
}

func ProfileService(ctx *fiber.Ctx) error {
	user := core_jwt.GetTokenInfo(ctx)

	cache := repo_user.GetUserProfileCache(user.ID)
	if cache != nil {
		return ctx.Status(fiber.StatusOK).JSON(repo_user.UserProfileResDto{
			Success: true,
			Message: "",
			Errors:  nil,
			Data:    cache,
		})
	}

	profile := &repo_user.UserProfileDto{}
	if err := core_db.Db.Model(repo_user.UserModel{}).Where("id = ?", user.ID).First(profile).Error; err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(config.ResDto{
			Success: true,
			Message: "User not found",
			Errors:  nil,
			Data:    nil,
		})
	}

	repo_user.SetUserProfileCache(profile.ID, profile)

	return ctx.Status(fiber.StatusOK).JSON(repo_user.UserProfileResDto{
		Success: true,
		Message: "",
		Errors:  nil,
		Data:    profile,
	})
}
