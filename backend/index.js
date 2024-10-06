const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weather.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
