import app from "./src/app.js";
import config from "./src/config/dotenv.config.js";
import connectDB from "./src/config/dataBase.js";

await connectDB();
app.listen(config.PORT, () => {
  console.log("server is runing");
});
