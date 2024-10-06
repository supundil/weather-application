const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/:location", async (req, res) => {
  const location = req.params.location;
  const apiKey = process.env.WEATHER_API_KEY;
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;
