import express from "express";
import { exec } from "child_process";

const app = express();

app.get("/run", (req, res) => {
  exec("echo Hello from Node server", (err, stdout) => {
    if (err) return res.status(500).send(err.message);
    res.send(stdout);
  });
});

app.listen(4000, () => console.log("Server running on port 4000"));
