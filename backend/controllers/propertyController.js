import Property from '../models/Property.js';

// @desc    Get all properties
// @route   GET /api/properties
// @access  Private
const getProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, projectName } = req.query;

    let query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (minPrice) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }

    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    if (projectName) {
      query.project_name = { $regex: projectName, $options: 'i' };
    }

    const properties = await Property.find(query);

    // Add full URLs for images
    const propertiesWithUrls = properties.map(property => ({
      ...property.toObject(),
      main_image: `http://localhost:${process.env.PORT || 5000}/uploads/${property.main_image}`,
      gallery_images: property.gallery_images.map(img => `http://localhost:${process.env.PORT || 5000}/uploads/${img}`),
    }));

    res.json(propertiesWithUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Private
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      // Add full URLs for images
      const propertyWithUrls = {
        ...property.toObject(),
        main_image: `http://localhost:${process.env.PORT || 5000}/uploads/${property.main_image}`,
        gallery_images: property.gallery_images.map(img => `http://localhost:${process.env.PORT || 5000}/uploads/${img}`),
      };

      res.json(propertyWithUrls);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private
const createProperty = async (req, res) => {
  const { project_name, builder_name, location, price, description, highlights } = req.body;

  try {
    const main_image = req.files.main_image ? req.files.main_image[0].filename : null;
    const gallery_images = req.files.gallery_images ? req.files.gallery_images.map(file => file.filename) : [];

    if (!main_image) {
      return res.status(400).json({ message: 'Main image is required' });
    }

    const property = new Property({
      project_name,
      builder_name,
      location,
      price,
      main_image,
      gallery_images,
      description,
      highlights,
    });

    const createdProperty = await property.save();

    // Add full URLs for images
    const propertyWithUrls = {
      ...createdProperty.toObject(),
      main_image: `http://localhost:${process.env.PORT || 5000}/uploads/${createdProperty.main_image}`,
      gallery_images: createdProperty.gallery_images.map(img => `http://localhost:${process.env.PORT || 5000}/uploads/${img}`),
    };

    res.status(201).json(propertyWithUrls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private
const updateProperty = async (req, res) => {
  const { project_name, builder_name, location, price, description, highlights } = req.body;

  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      property.project_name = project_name || property.project_name;
      property.builder_name = builder_name || property.builder_name;
      property.location = location || property.location;
      property.price = price || property.price;
      property.description = description || property.description;
      property.highlights = highlights || property.highlights;

      if (req.files.main_image) {
        property.main_image = req.files.main_image[0].filename;
      }

      if (req.files.gallery_images) {
        property.gallery_images = req.files.gallery_images.map(file => file.filename);
      }

      const updatedProperty = await property.save();

      // Add full URLs for images
      const propertyWithUrls = {
        ...updatedProperty.toObject(),
        main_image: `http://localhost:${process.env.PORT || 5000}/uploads/${updatedProperty.main_image}`,
        gallery_images: updatedProperty.gallery_images.map(img => `http://localhost:${process.env.PORT || 5000}/uploads/${img}`),
      };

      res.json(propertyWithUrls);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      await property.remove();
      res.json({ message: 'Property removed' });
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty };
