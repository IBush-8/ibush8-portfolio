import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    descriptionFa: { type: String, required: true, trim: true },
    descriptionEn: { type: String, required: true, trim: true },
    stack: [{ type: String, trim: true }],
    repoUrl: { type: String, required: true, trim: true },
    repoLabel: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
