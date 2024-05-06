// importing the env variable before anything
import dotenv from "dotenv";
dotenv.config();
import { server } from "./index.js";

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
})