import mongoose, { Schema } from 'mongoose';

// Check if the model is already compiled to avoid recompiling
const PeopleSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String },
  property: { type: String },
  unit: { type: String },
  role: { type: String },
  lastInvited: { type: Date },
  email: { type: String },
  phone: { type: String }
});

// If the model is already compiled, use the existing one; otherwise, compile a new one
export default mongoose.models.People || mongoose.model('People', PeopleSchema);
