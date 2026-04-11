import app from "./src/app.js";
import config from "./src/config/dotenv.config.js";
import connectDB from "./src/config/dataBase.js";

app.listen(config.PORT, () => {
  connectDB();
  console.log("server is runing");
});
