import crypto from 'node:crypto';
import { Contact } from '../models/Contact.js';
import { validateContact } from '../validators/contact.js';
import { notifyNewContact } from '../services/email.js';

export async function createContact(req, res, next) {
  try {
    const result = validateContact(req.body);
    if (!result.valid) return res.status(400).json({success:false,message:'Validation failed',errors:result.errors});
    const ip = req.ip || req.socket.remoteAddress || '';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');
    const contact = await Contact.create({...result.value,ipHash});
    await notifyNewContact(contact);
    res.status(201).json({success:true,message:'Message received',data:{id:contact._id,createdAt:contact.createdAt}});
  } catch(error){next(error)}
}

export async function listContacts(req,res,next) {
  try {
    const contacts = await Contact.find({}).select('-ipHash').sort({createdAt:-1}).lean();
    res.json({success:true,count:contacts.length,data:contacts});
  } catch(error){next(error)}
}

export async function updateContact(req,res,next) {
  try {
    const allowed=['new','read','replied','archived'];
    if(!allowed.includes(req.body.status)) return res.status(400).json({success:false,message:'Invalid status'});
    const contact=await Contact.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true}).select('-ipHash').lean();
    if(!contact)return res.status(404).json({success:false,message:'Message not found'});
    res.json({success:true,data:contact});
  }catch(error){next(error)}
}
