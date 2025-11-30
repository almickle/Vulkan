import "dotenv/config";
import { createApp } from "./app";

const app = createApp();
const port = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
