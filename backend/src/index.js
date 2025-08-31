
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router as productsRouter } from './products.routes.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: corsOrigin, credentials: true }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api', productsRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
