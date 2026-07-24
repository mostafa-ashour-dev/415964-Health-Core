import app from "./app.js";

import { NODE_ENV, PORT } from "./config/env.config.js";

import connectDB from "./db/connect.db.js";

app.listen(PORT, '0.0.0.0', async () => {
    console.log(
        `Server is running on: http://localhost:${PORT}\nEnvironment: ${NODE_ENV}`,
    );

    await connectDB();
});