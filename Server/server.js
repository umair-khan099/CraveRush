import app from "./src/app.js";
import config from "./src/config/dotenv.config.js";

app.listen(config.PORT, () => {
  console.log("servver is runing");
});
