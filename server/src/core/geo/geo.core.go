package core_geo

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ipinfo/go/v2/ipinfo"
	"net"
	"server/src/config"
	"server/src/core/cache"
	"strings"
)

func GetGeoInfoFromIp(ctx *fiber.Ctx) (*ipinfo.Core, error) {
	var ip string

	if ip = config.LocalIp; ip == "" {
		ip = getClientIP(ctx)
	}

	if cached := core_cache.CacheGet(ip); cached != nil {
		return cached.(*ipinfo.Core), nil
	}

	client := ipinfo.NewClient(nil, nil, "cb268ab6842461")

	info, err := client.GetIPInfo(net.ParseIP(ip))
	if err != nil {
		return nil, err
	}

	core_cache.CacheSet(ip, info)

	return info, nil
}

func getClientIP(ctx *fiber.Ctx) string {
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
}
