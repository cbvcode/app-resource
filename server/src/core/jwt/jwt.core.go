package core_jwt

import (
	"github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"server/src/config"
	"time"
)

type TokenData struct {
	ID uuid.UUID `json:"id"`
}

const contextKey = "user"

func TokenMiddleware() fiber.Handler {
	jwtSecret := config.JwtSecret

	return jwtware.New(jwtware.Config{
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			cookie := fiber.Cookie{Name: "token", Value: "", HTTPOnly: true, Secure: false}
			ctx.Cookie(&cookie)

			return ctx.Status(fiber.StatusUnauthorized).JSON(config.ResDto{
				Success: false,
				Errors:  []*config.ErrDto{{Field: "", Value: "You are Unauthorized"}},
				Data:    nil,
			})
		},
		SigningKey:  jwtware.SigningKey{Key: []byte(jwtSecret)},
		ContextKey:  contextKey,
		TokenLookup: "cookie:token",
	})
}

func CreateToken(ctx *fiber.Ctx, user TokenData) error {
	jwtSecret := config.JwtSecret

	claims := jwt.MapClaims{
		"id":  user.ID,
		"exp": time.Now().Add(time.Minute * 1).Unix(),
	}

	tokenData := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := tokenData.SignedString([]byte(jwtSecret))
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(config.ResDto{
			Success: false,
			Message: "You are Unauthorized",
			Errors:  nil,
			Data:    nil,
		})
	}

	cookie := fiber.Cookie{Name: "token", Value: token, HTTPOnly: true, Secure: false}
	ctx.Cookie(&cookie)

	return nil
}

func GetTokenInfo(ctx *fiber.Ctx) *TokenData {
	user := ctx.Locals(contextKey).(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)

	idStr := claims["id"].(string)
	id, _ := uuid.Parse(idStr)

	if id == uuid.Nil {
		return &TokenData{ID: uuid.Nil}
	}

	return &TokenData{ID: id}
}

func DeleteToken(ctx *fiber.Ctx) uuid.UUID {
	user := ctx.Locals(contextKey).(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)

	idStr := claims["id"].(string)
	id, _ := uuid.Parse(idStr)

	cookie := fiber.Cookie{Name: "token", Value: "", HTTPOnly: true, Secure: false}
	ctx.Cookie(&cookie)

	return id
}
