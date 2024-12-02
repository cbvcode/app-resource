package core_db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"server/src/config"
)

var DbInstance *gorm.DB

func InitDB() {
	dsn := config.DatabaseUrl

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger:                 logger.Default.LogMode(logger.Info),
		PrepareStmt:            true,
		QueryFields:            true,
		SkipDefaultTransaction: true,
	})
	if err != nil {
		panic("Failed to connect to database")
	}

	DbInstance = db
}
