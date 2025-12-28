import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;

let password = "secret123";

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use((req, res, next) => {
  if (req.body.pass !== password) {
    return res.status(403).send("Forbidden");
  }
  next();
});

app.get("/", (req, res) => {
  res.json({ name: "John", age: 30, city: "New York" });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).send("POST request to the homepage");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
