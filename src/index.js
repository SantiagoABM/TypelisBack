import app from "./app"
import "./database";
import { PORT } from "./config";
import "./libs/initialSetup";

app.listen(PORT);

console.log('server on port', PORT);