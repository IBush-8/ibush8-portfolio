import crypto from "node:crypto";
import { Admin } from "../models/Admin.js";
import { env } from "../config/env.js";

export async function login(req, res, next) {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });

    const admin = await Admin.findOne({ email });
    if (!admin || !admin.verifyPassword(password)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    admin.tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    admin.tokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await admin.save();

    res.json({ success: true, token, expiresAt: admin.tokenExpiresAt });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    req.admin.tokenHash = null;
    req.admin.tokenExpiresAt = null;
    await req.admin.save();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

export async function bootstrapAdmin(req, res, next) {
  try {
    const email = String(process.env.ADMIN_EMAIL || "")
      .trim()
      .toLowerCase();
    const password = String(process.env.ADMIN_PASSWORD || "");

    if (!email || password.length < 12) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD (12+ chars) are required",
      );
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.json({ success: true, message: "Admin already exists" });
    }

    const admin = new Admin({ email });
    admin.setPassword(password);
    await admin.save();

    res.json({ success: true, message: "Admin created" });
  } catch (error) {
    next(error);
  }
}
