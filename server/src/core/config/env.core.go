package core_config

import (
	"fmt"
	"github.com/joho/godotenv"
	"os"
)

var (
	PORT          = ""
	ALLOW_ORIGINS = ""
	JWT_SECRET    = ""
	COOKIE_SECRET = ""
	LOCAL_IP      = ""
	DATABASE_URL  = ""
)

func InitEnv() {
	if err := godotenv.Load(); err != nil {
		panic("Error loading .env file")
	}

	PORT = getEnv("PORT", "8000")
	ALLOW_ORIGINS = getEnv("ALLOW_ORIGINS", "*")
	JWT_SECRET = getEnv("JWT_SECRET", "your-secret-key")
	COOKIE_SECRET = getEnv("COOKIE_SECRET", "your-secret-key")
	LOCAL_IP = getEnv("LOCAL_IP", "35.181.8.72")
	DATABASE_URL = getEnv("DATABASE_URL", "*")
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
