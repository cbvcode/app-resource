package module_worker

import (
	"encoding/json"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"os"
	"server/src/config"
	"server/src/core/cache"
	"server/src/core/geo"
	"strconv"
	"strings"
)

type CustomFloat float64

func (cf *CustomFloat) UnmarshalJSON(data []byte) error {
	// Зчитуємо сирі дані
	raw := string(data)

	// Видаляємо лапки з рядка (наприклад, "16,840.78" -> 16,840.78)
	if strings.HasPrefix(raw, `"`) && strings.HasSuffix(raw, `"`) {
		raw = raw[1 : len(raw)-1]
	}

	// Видаляємо коми з числа (наприклад, 16,840.78 -> 16840.78)
	raw = strings.ReplaceAll(raw, ",", "")

	// Конвертуємо в float64
	value, err := strconv.ParseFloat(raw, 64)
	if err != nil {
		return fmt.Errorf("failed to parse float from string: %v", err)
	}

	*cf = CustomFloat(value)
	return nil
}

type Country struct {
	CountryName     string      `json:"country_name"`
	Country2Code    string      `json:"country_2code"`
	Country3Code    string      `json:"country_3code"`
	CurrencySymbol  string      `json:"currency_symbol"`
	CurrencyName    string      `json:"currency_name"`
	CurrencyCode    string      `json:"currency_code"`
	SymbolAtStart   string      `json:"symbol_at_start"`
	UsdExchangeRate CustomFloat `json:"usd_exchange_rate"`
	EurExchangeRate CustomFloat `json:"eur_exchange_rate"`
	CurrencyWallet  string      `json:"currency_wallet"`
	CurrencyPaypal  string      `json:"currency_paypal"`
	CurrencyCard    string      `json:"currency_card"`
}

type ResponseData struct {
	Currencies Country `json:"currencies"`
}

func WorkerService(ctx *fiber.Ctx) error {
	geo, _ := core_geo.GetGeoInfoFromIp(ctx)
	detectedCountry := geo.Country
	if detectedCountry == "" {
		detectedCountry = "US"
	}

	cacheKey := fmt.Sprintf("country:%s", detectedCountry)
	cache := core_cache.CacheGet(cacheKey)
	if cache != nil {
		return ctx.Status(fiber.StatusOK).JSON(config.ResDto{
			Success: true,
			Message: "success",
			Errors:  nil,
			Data:    cache,
		})
	}

	file, err := os.Open("./data/countries.json")
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Failed to read countries data",
			"error":   err.Error(),
		})
	}
	defer file.Close()

	var countriesData []Country
	if err := json.NewDecoder(file).Decode(&countriesData); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Failed to parse countries data",
			"error":   err.Error(),
		})
	}

	var country Country
	for _, c := range countriesData {
		if c.Country2Code == detectedCountry {
			country = c
			break
		}
	}

	if country.Country2Code == "" {
		for _, c := range countriesData {
			if c.Country2Code == "US" {
				country = c
				break
			}
		}
	}

	core_cache.CacheSet(cacheKey, country)

	return ctx.Status(fiber.StatusOK).JSON(config.ResDto{
		Success: true,
		Message: "success",
		Errors:  nil,
		Data:    country,
	})
}
