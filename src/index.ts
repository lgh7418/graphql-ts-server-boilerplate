import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { startServer } from "./startServer";

startServer();
