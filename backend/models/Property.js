import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },
  builder_name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  main_image: {
    type: String,
    required: true,
  },
  gallery_images: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  highlights: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
