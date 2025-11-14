import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import multer from 'multer';
import path from 'path';

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const router = express.Router();

router.route('/').get( getProperties);
router.route('/:id').get( getPropertyById);
router.post(
  '/',
  protect,
  upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'gallery_images', maxCount: 10 },
  ]),
  createProperty
);
router.route('/:id').put(
  protect,
  upload.fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'gallery_images', maxCount: 10 },
  ]),
  updateProperty
);
router.route('/:id').delete(protect, deleteProperty);

export default router;
