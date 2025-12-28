import express from "express";
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/about", (req, res) => {
  res.send("This is the about page.");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
