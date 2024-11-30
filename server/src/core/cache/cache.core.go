package core_cache

import (
	"github.com/dgraph-io/ristretto"
)

var store *ristretto.Cache

func InitStore() {
	cache, err := ristretto.NewCache(&ristretto.Config{
		NumCounters: 1e7,
		MaxCost:     1 << 30,
		BufferItems: 64,
	})
	if err != nil {
		panic(err)
	}

	store = cache
}

func StoreGet(key string) interface{} {
	value, found := store.Get(key)
	if !found {
		return nil
	}

	return value
}

func StoreSet(key string, data interface{}) {
	store.Set(key, data, 1)
}

func StoreDel(key string) {
	store.Del(key)
}

func StoreRefetch(key string, data interface{}) {
	StoreDel(key)
	StoreSet(key, data)
}
