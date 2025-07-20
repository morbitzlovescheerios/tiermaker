const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); // serve frontend from "public" folder

// Get all tierlists
app.get("/api/tierlists", (req, res) => {
  const data = fs.existsSync("tierlists.json") ? fs.readFileSync("tierlists.json") : "[]";
  res.send(data);
});

// Get one tierlist by ID
app.get("/api/tierlists/:id", (req, res) => {
  const id = req.params.id;
  const data = JSON.parse(fs.readFileSync("tierlists.json"));
  const item = data.find(t => t.id === id);
  if (item) res.send(item);
  else res.status(404).send({ error: "Not found" });
});

// Save a new tierlist
app.post("/api/tierlists", (req, res) => {
  const data = fs.existsSync("tierlists.json") ? JSON.parse(fs.readFileSync("tierlists.json")) : [];
  const tierlist = { ...req.body, id: Date.now().toString() };
  data.push(tierlist);
  fs.writeFileSync("tierlists.json", JSON.stringify(data, null, 2));
  res.send({ success: true, id: tierlist.id });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
