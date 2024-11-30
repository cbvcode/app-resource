package repo_user

import (
	"fmt"
	"github.com/google/uuid"
	"server/src/core/cache"
)

const userProfileKey = "user-profile"

func GetUserProfileCache(id uuid.UUID) *UserProfileDto {
	storageKey := fmt.Sprintf("%s:%s", userProfileKey, id)

	value := core_cache.CacheGet(storageKey)
	if value == nil {
		return nil
	}

	return value.(*UserProfileDto)
}

func SetUserProfileCache(id uuid.UUID, data *UserProfileDto) {
	storageKey := fmt.Sprintf("%s:%s", userProfileKey, id)

	core_cache.CacheSet(storageKey, data)
}

func DelUserProfileCache(id uuid.UUID) {
	storageKey := fmt.Sprintf("%s:%s", userProfileKey, id)

	core_cache.CacheDel(storageKey)
}
