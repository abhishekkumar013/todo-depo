import { prismClient } from "@repo/db/client";
import express from "express";

const app = express();
app.use(express.json());

app.get("/user", async (req, res) => {
  try {
    const users = await prismClient.user.findMany();

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});
app.post("/user", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const user = await prismClient.user.create({
      data: {
        username,
        password,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
