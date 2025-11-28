import express from "express";
import router from "./routes/index.js";
import { prisma } from "./database/client.js";

export function createApp(): express.Application {
  const app = express();

  app.use(express.json());

  // health route early & simple
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/create-dummy-user", (_req, res) => {
    console.log("DATABASE_URL at runtime:", process.env.DATABASE_URL);
    prisma.user
      .create({
        data: {
          id: "2",
          name: "Bob",
          email: "bob@vulkan.io",
          createdAt: new Date()
        }
      })
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        console.error("Error creating dummy user:", error);
        res.status(500).json({ error: "Failed to create dummy user" });
      });
  });

  // main API router (versioned)
  app.use("/api", router);

  // error handler (last)
  app.use(
    (
      err: any,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error(err);
      res.status(err.statusCode || 500).json({
        error: err.message || "Internal server error"
      });
    }
  );

  return app;
}
