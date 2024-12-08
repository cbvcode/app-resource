package module_auth

import (
	"github.com/gofiber/fiber/v2"
	"server/src/core/jwt"
	"server/src/core/limiter"
)

func AuthModule(app fiber.Router) {
	SignInRoute(app)
	SignUpRoute(app)
	SignOutRoute(app)

	ProfileRoute(app)

	ForgotPasswordRoute(app)
}

// SignInRoute
//
//	@Description	sign in user
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Param			json	body		repo_user.SignInReqDto	true	"sign in body"
//	@Success		200		{object}	config.ResDto
//	@Router			/v1/sign-in [post]
func SignInRoute(app fiber.Router) {
	limit := 10

	app.Post("sign-in", core_limiter.LimiterMiddleware(&limit), func(ctx *fiber.Ctx) error {
		return SignInService(ctx)
	})
}

// SignUpRoute
//
//	@Description	sign up user
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Param			json	body		repo_user.SignUpReqDto	true	"sign up body"
//	@Success		200		{object}	config.ResDto
//	@Router			/v1/sign-up [post]
func SignUpRoute(app fiber.Router) {
	limit := 10

	app.Post("sign-up", core_limiter.LimiterMiddleware(&limit), func(ctx *fiber.Ctx) error {
		return SignUpService(ctx)
	})
}

// SignOutRoute
//
//	@Description	sign out user
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	config.ResDto
//	@Router			/v1/sign-out [post]
func SignOutRoute(app fiber.Router) {
	limit := 10

	app.Post("sign-out", core_limiter.LimiterMiddleware(&limit), core_jwt.TokenMiddleware(), func(ctx *fiber.Ctx) error {
		return SignOutService(ctx)
	})
}

// ProfileRoute
//
//	@Description	user profile
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	repo_user.UserProfileResDto
//	@Router			/v1/profile [get]
func ProfileRoute(app fiber.Router) {
	limit := 30

	app.Get("profile", core_limiter.LimiterMiddleware(&limit), core_jwt.TokenMiddleware(), func(ctx *fiber.Ctx) error {
		return ProfileService(ctx)
	})
}

// ForgotPasswordRoute
//
//	@Description	user forgot password
//	@Tags			Auth
//	@Accept			json
//	@Produce		json
//	@Param			json	body		repo_user.ForgotPasswordReqDto	true	"forgot password body"
//	@Success		200		{object}	config.ResDto
//	@Router			/v1/forgot-password [post]
func ForgotPasswordRoute(app fiber.Router) {
	limit := 3

	app.Post("forgot-password", core_limiter.LimiterMiddleware(&limit), func(ctx *fiber.Ctx) error {
		return ForgotPasswordService(ctx)
	})
}
