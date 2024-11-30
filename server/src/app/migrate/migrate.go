package migrate

import (
	"server/src/app/repo/user"
	"server/src/core/db"
)

func InitMigrateDb() {
	err := core_db.DbInstance.AutoMigrate(&repo_user.UserModel{})
	if err != nil {
		panic(err)
	}
}