import express from "express";
import router from "@/routes";

export function createApp(): express.Application {
  const app = express();

  app.use(express.raw({ type: "*/*", limit: "50mb" })); // for binary file uploads

  // health route early & simple
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/", router);

  // error handler (last)
  app.use(
    (
      err: { statusCode?: number; message?: string },
      _req: express.Request,
      res: express.Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _next: express.NextFunction
    ) => {
      console.log(err);
      res.status(err.statusCode || 500).json({
        error: err.message || "Internal server error"
      });
    }
  );

  return app;
}
