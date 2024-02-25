import app from "./app.js";
import database from "./database/connect.js";
import "dotenv/config";

await database.start();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("[SERVER] - Server listening");
});
