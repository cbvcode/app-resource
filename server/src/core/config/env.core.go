package core_config

import (
	"fmt"
	"github.com/joho/godotenv"
	"os"
)

var (
	Port         = ""
	AllowOrigins = ""
	JwtSecret    = ""
	CookieSecret = ""
	LocalIp      = ""
	DatabaseUrl  = ""
)

func InitEnv() {
	if err := godotenv.Load(); err != nil {
		panic("Error loading .env file")
	}

	Port = getEnv("PORT", "4000")
	AllowOrigins = getEnv("ALLOW_ORIGINS", "*")
	JwtSecret = getEnv("JWT_SECRET", "your-secret-key")
	CookieSecret = getEnv("COOKIE_SECRET", "your-secret-key")
	LocalIp = getEnv("LOCAL_IP", "35.181.8.72")
	DatabaseUrl = getEnv("DATABASE_URL", "host=localhost user=postgres password=password dbname=local port=5434")
}

func getEnv(name string, fallback string) string {
	if value, exists := os.LookupEnv(name); exists {
		return value
	}

	if fallback != "" {
		return fallback
	}

	panic(fmt.Sprintf(`Environment variable not found: %v`, name))
}
