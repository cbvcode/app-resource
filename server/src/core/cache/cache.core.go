package core_cache

import (
	"github.com/dgraph-io/ristretto"
)

var cacheInstance *ristretto.Cache

func InitStore() {
	cache, err := ristretto.NewCache(&ristretto.Config{
		NumCounters: 1e7,
		MaxCost:     1 << 30,
		BufferItems: 64,
	})
	if err != nil {
		panic(err)
	}

	cacheInstance = cache
}

func CacheGet(key string) interface{} {
	value, found := cacheInstance.Get(key)
	if !found {
		return nil
	}

	return value
}

func CacheSet(key string, data interface{}) {
	cacheInstance.Set(key, data, 1)
}

func CacheDel(key string) {
	cacheInstance.Del(key)
}

func StoreRefetch(key string, data interface{}) {
	CacheDel(key)
	CacheSet(key, data)
}
