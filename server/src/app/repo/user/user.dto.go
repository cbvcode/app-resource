package repo_user

import (
	"encoding/json"
	"github.com/google/uuid"
	"server/src/config"
	"strings"
)

type UserProfileDto struct {
	ID       uuid.UUID `gorm:"type:uuid;"`
	Email    string    `json:"email"`
	Username string    `json:"username"`
}

type SignInReqDto struct {
	Email    string `json:"email" validate:"required=required,email=incorrect email format"`
	Password string `json:"password" validate:"required=required"`
}

type SignUpReqDto struct {
	Email           string `json:"email" validate:"required=required,email=incorrect email format"`
	Username        string `json:"username" validate:"required=required"`
	ConfirmPassword string `json:"confirmPassword" validate:"required=required"`
	Password        string `json:"password" validate:"required=required"`
}

type UserProfileResDto struct {
	Success bool             `json:"success"`
	Errors  []*config.ErrDto `json:"errors"`
	Data    *UserProfileDto  `json:"data"`
}

// UnmarshalJSON Transform dto field
func (s *SignUpReqDto) UnmarshalJSON(data []byte) error {
	type Alias SignUpReqDto
	aux := &struct {
		*Alias
	}{
		Alias: (*Alias)(s),
	}
	if err := json.Unmarshal(data, &aux); err != nil {
		return err
	}
	s.Email = strings.ToLower(s.Email)
	return nil
}
