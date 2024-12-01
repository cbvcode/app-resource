package config

type ErrDto struct {
	Field string `json:"field"`
	Value string `json:"value"`
}

type ResDto struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Errors  []*ErrDto   `json:"errors"`
	Data    interface{} `json:"data"`
}
