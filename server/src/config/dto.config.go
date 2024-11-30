package config

type ErrDto struct {
	Field string `json:"field"`
	Value string `json:"value"`
}

type ResDto struct {
	Success bool        `json:"success"`
	Errors  []*ErrDto   `json:"errors"`
	Data    interface{} `json:"data"`
}
