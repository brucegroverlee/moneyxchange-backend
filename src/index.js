import "module-alias/register";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import _package from "@root/package.json";
const PORT = process.env.PORT || 3000;
const VERSION = _package.version; // require('@root/package.json').version;

const app = express();
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

import api from "./api";
app.use(api);

// ********************************************
// http server listening
// ********************************************
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log("NODE_ENV: ", process.env.NODE_ENV);
    console.log(`Backend v${VERSION}`);
    console.log("The RESTful Api is running at http://localhost:%d/", PORT);
  });
}

export default app; // for testing
