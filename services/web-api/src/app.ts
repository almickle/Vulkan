import express from "express";
import router from "./routes/index.js";

export function createApp(): express.Application {
  const app = express();

  app.use(express.json());

  // health route early & simple
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
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
