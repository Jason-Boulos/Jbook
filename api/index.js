const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let cities = [
  {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: { lat: 38.727881642324164, lng: -9.140900099907554 },
    id: 73930385,
  },
  // Add other cities here if you want
];

app.get("/cities", (req, res) => res.json(cities));

app.get("/cities/:id", (req, res) => {
  const city = cities.find((c) => c.id === Number(req.params.id));
  if (!city) return res.status(404).json({ error: "City not found" });
  res.json(city);
});

app.post("/cities", (req, res) => {
  const newCity = { ...req.body, id: Date.now() };
  cities.push(newCity);
  res.status(201).json(newCity);
});

app.delete("/cities/:id", (req, res) => {
  cities = cities.filter((c) => c.id !== Number(req.params.id));
  res.json({ message: "City deleted" });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
