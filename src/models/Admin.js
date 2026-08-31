import mongoose from 'mongoose';
import crypto from 'node:crypto';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  tokenHash: { type: String, default: null },
  tokenExpiresAt: { type: Date, default: null }
}, { timestamps: true });

adminSchema.methods.setPassword = function(password) {
  this.passwordHash = crypto.createHash('sha256').update(password).digest('hex');
};

adminSchema.methods.verifyPassword = function(password) {
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(this.passwordHash));
};

export const Admin = mongoose.model('Admin', adminSchema);
