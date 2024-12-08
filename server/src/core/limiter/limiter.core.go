package core_limiter

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"server/src/config"
	"strings"
	"time"
)

const defaultLimit = 7

func LimiterMiddleware(limit *int) fiber.Handler {
	var lim int
	if limit == nil {
		lim = defaultLimit
	} else {
		lim = *limit
	}

	limiterConfig := limiter.Config{
		Max:        lim,
		Expiration: 1 * time.Minute,
		KeyGenerator: func(ctx *fiber.Ctx) string {
			xForwardedFor := ctx.Get("X-Forwarded-For")
			xRealIP := ctx.Get("X-Real-IP")

			if xForwardedFor != "" {
				ipList := strings.Split(xForwardedFor, ",")
				if len(ipList) > 0 {
					return strings.TrimSpace(ipList[0])
				}
			}

			if xRealIP != "" {
				return xRealIP
			}

			return ctx.IP()
		},
		LimitReached: func(c *fiber.Ctx) error {
			return c.Status(fiber.StatusTooManyRequests).JSON(config.ResDto{
				Success: false,
				Message: "too many requests",
				Errors:  nil,
				Data:    nil,
			})
		},
	}

	return limiter.New(limiterConfig)
}
