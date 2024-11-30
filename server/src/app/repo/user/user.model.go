package repo_user

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserModel struct {
	gorm.Model

	ID       uuid.UUID `gorm:"type:uuid"`
	Email    string    `json:"email" gorm:"unique;not null"`
	Username string    `json:"username"`
	Password string    `json:"password"`
}

// BeforeCreate model generate uuid
func (user *UserModel) BeforeCreate(tx *gorm.DB) (err error) {
	user.ID = uuid.New()
	return
}
