package core_jwt

import (
	"github.com/gofiber/contrib/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"os"
	"server/src/config"
	"time"
)

type TokenData struct {
	ID       uuid.UUID `json:"id"`
	Email    string    `json:"email"`
	Username string    `json:"username"`
}

const contextKey = "user"

func TokenMiddleware() fiber.Handler {
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "super-secret-jwt-key"
	}

	return jwtware.New(jwtware.Config{
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
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
	jwtSecret := os.Getenv("JWT_SECRET")

	claims := jwt.MapClaims{
		"id":       user.ID,
		"Email":    user.Email,
		"Username": user.Username,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	}

	tokenData := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := tokenData.SignedString([]byte(jwtSecret))
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(config.ResDto{
			Success: false,
			Errors:  []*config.ErrDto{{Field: "", Value: "You are Unauthorized"}},
			Data:    nil,
		})
	}

	cookie := fiber.Cookie{
		Name:     "token",
		Value:    token,
		HTTPOnly: true,
		Secure:   false,
	}
	ctx.Cookie(&cookie)

	return nil
}

func GetTokenInfo(ctx *fiber.Ctx) *TokenData {
	user := ctx.Locals(contextKey).(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)

	idStr := claims["id"].(string)
	id, _ := uuid.Parse(idStr)

	if id == uuid.Nil {
		return &TokenData{
			ID:       uuid.Nil,
			Email:    claims["email"].(string),
			Username: claims["username"].(string),
		}
	}

	return &TokenData{
		ID:       id,
		Email:    claims["email"].(string),
		Username: claims["username"].(string),
	}
}

func DeleteToken(ctx *fiber.Ctx) uuid.UUID {
	user := ctx.Locals(contextKey).(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)

	idStr := claims["id"].(string)
	id, _ := uuid.Parse(idStr)

	cookie := fiber.Cookie{
		Name:     "token",
		Value:    "",
		HTTPOnly: true,
		Secure:   false,
	}
	ctx.Cookie(&cookie)

	return id
}
