import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { Project } from './models/Project.js';
import { Admin } from './models/Admin.js';

const projects = [
  {
    slug: 'e-commerce-backend',
    name: 'E-commerce Backend',
    descriptionFa: 'بک‌اند کامل یک فروشگاه آنلاین: مدیریت محصول، سبد خرید، سفارش و احراز هویت.',
    descriptionEn: 'A full backend for an online store: product management, cart, orders, and authentication.',
    stack: ['Node.js', 'Express', 'MongoDB'],
    repoUrl: 'https://github.com/IBush-8/ecommerce-backend',
    repoLabel: 'github.com/IBush-8/ecommerce-backend',
    featured: true,
    order: 1
  },
  {
    slug: 'hospital-shift-management',
    name: 'Hospital Shift Management',
    descriptionFa: 'سیستم مدیریت شیفت پرسنل بیمارستان، زمان‌بندی، تخصیص نقش و گزارش‌گیری.',
    descriptionEn: 'Hospital staff shift management with scheduling, role assignment, and reporting.',
    stack: ['Node.js', 'Express', 'MongoDB'],
    repoUrl: 'https://github.com/IBush-8',
    repoLabel: 'github.com/IBush-8',
    featured: true,
    order: 2
  },
  {
    slug: 'radio-app-backend',
    name: 'Radio App Backend',
    descriptionFa: 'بک‌اند یک اپلیکیشن رادیوی آنلاین، استریم، پلی‌لیست و مدیریت محتوا.',
    descriptionEn: 'Backend for an online radio application with streaming, playlists, and content management.',
    stack: ['Node.js', 'Express'],
    repoUrl: 'https://github.com/IBush-8',
    repoLabel: 'github.com/IBush-8',
    featured: false,
    order: 3
  },
  {
    slug: 'arko-tournament-platform',
    name: 'Arko Tournament Platform',
    descriptionFa: 'پلتفرم برگزاری تورنمنت، ثبت‌نام تیم‌ها، براکت‌بندی و نتایج زنده.',
    descriptionEn: 'Tournament platform with team registration, bracket generation, and live results.',
    stack: ['Node.js', 'MongoDB'],
    repoUrl: 'https://github.com/IBush-8',
    repoLabel: 'github.com/IBush-8',
    featured: false,
    order: 4
  }
];

await connectDB();
await Project.deleteMany({});
await Project.insertMany(projects);
const adminEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const adminPassword = String(process.env.ADMIN_PASSWORD || '');
if (adminEmail && adminPassword.length >= 12) {
  let admin = await Admin.findOne({ email: adminEmail });
  if (!admin) {
    admin = new Admin({ email: adminEmail });
    admin.setPassword(adminPassword);
    await admin.save();
    console.log(`Created admin: ${adminEmail}`);
  } else {
    console.log(`Admin already exists: ${adminEmail}`);
  }
} else {
  console.log('Admin not created: set ADMIN_EMAIL and ADMIN_PASSWORD (12+ chars) in .env');
}
console.log(`Seeded ${projects.length} projects.`);
await mongoose.disconnect();
