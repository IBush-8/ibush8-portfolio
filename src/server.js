import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: env.frontendOrigin === '*' ? true : env.frontendOrigin,
  methods: ['GET', 'POST']
}));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: 'ibush8-portfolio-api',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, '../public')));

app.get('*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(notFound);
app.use(errorHandler);

await connectDB();

app.listen(env.port, () => {
  console.log(`IBush8 portfolio running on http://localhost:${env.port}`);
});
