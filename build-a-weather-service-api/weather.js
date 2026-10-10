import express from "express";

const router = express.Router();

const SUPPORTED_CITIES = ["London", "New York", "Chicago", "Tokyo", "Los Angeles"];

router.get("/", (req, res) => {
    res.status(200).json(SUPPORTED_CITIES);
});

router.get("/:city", async (req, res) => {
    const { city } = req.params;
    try {
        const response = await fetch(
            `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
        );
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const data = await response.json();

        res.json({
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            description: data.weather[0].description,
            iconUrl: data.weather[0].icon,
        });
    } catch (error) {
        res.status(404).json({
            error: `Could not fetch weather status for ${city}.`
        });
    }
});

export default router;