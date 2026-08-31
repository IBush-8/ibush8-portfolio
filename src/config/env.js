import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ibush8_portfolio',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  contactTo: process.env.CONTACT_TO,
  contactFrom: process.env.CONTACT_FROM,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD
};
