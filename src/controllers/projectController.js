import { Project } from '../models/Project.js';

function publicProject(p, lang='fa') {
  return {
    id: p._id, slug:p.slug, name:p.name,
    description: lang === 'en' ? p.descriptionEn : p.descriptionFa,
    descriptionFa:p.descriptionFa, descriptionEn:p.descriptionEn,
    stack:p.stack, repoUrl:p.repoUrl, repoLabel:p.repoLabel,
    featured:p.featured, order:p.order
  };
}

export async function listProjects(req, res, next) {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'fa';
    const projects = await Project.find({}).sort({order:1,createdAt:-1}).lean();
    res.json({success:true,count:projects.length,data:projects.map(p=>publicProject(p,lang))});
  } catch (error) { next(error); }
}

export async function getProject(req,res,next) {
  try {
    const project = await Project.findById(req.params.id).lean().catch(()=>null)
      || await Project.findOne({slug:req.params.id}).lean();
    if(!project)return res.status(404).json({success:false,message:'Project not found'});
    res.json({success:true,data:publicProject(project, req.query.lang === 'en' ? 'en':'fa')});
  } catch(error){next(error)}
}

export async function createProject(req,res,next) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({success:true,data:publicProject(project.toObject())});
  } catch(error){next(error)}
}

export async function updateProject(req,res,next) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true});
    if(!project)return res.status(404).json({success:false,message:'Project not found'});
    res.json({success:true,data:publicProject(project.toObject())});
  } catch(error){next(error)}
}

export async function deleteProject(req,res,next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if(!project)return res.status(404).json({success:false,message:'Project not found'});
    res.json({success:true,message:'Project deleted'});
  } catch(error){next(error)}
}
