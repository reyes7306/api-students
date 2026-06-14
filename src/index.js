import express from 'express';
import { PORT } from './config.js';
import studentRoutes from "./routes/students.routes.js";
import { jsonRoto, notFound, errorHandler } from "./middlewares/errors.middleware.js";


const app = express();

app.use(express.json());
app.use('/api',studentRoutes);
app.use(jsonRoto);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT);

console.log('Server on port', PORT);