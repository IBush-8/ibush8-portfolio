import crypto from 'node:crypto';
import { Admin } from '../models/Admin.js';

export async function requireAdmin(req, res, next) {
  try {
    const header = req.get('authorization') || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) return res.status(401).json({ success:false, message:'Authentication required' });

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const admin = await Admin.findOne({
      tokenHash,
      tokenExpiresAt: { $gt: new Date() }
    });

    if (!admin) return res.status(401).json({ success:false, message:'Invalid or expired token' });

    req.admin = admin;
    next();
  } catch (error) { next(error); }
}
