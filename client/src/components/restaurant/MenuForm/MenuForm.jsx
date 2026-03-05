import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Button,
  IconButton,
  Chip,
  InputAdornment,
  RadioGroup,
  Radio,
  FormLabel,
} from '@mui/material';
import {
  Close,
  CloudUpload,
  Add,
  Delete,
  Restaurant,
  Category,
  AttachMoney,
  Timer,
  LocalOffer,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import './MenuForm.css';

const MenuForm = ({ item = null, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    originalPrice: '',
    image: null,
    imagePreview: null,
    isVeg: true,
    isAvailable: true,
    isBestseller: false,
    preparationTime: '',
    spiceLevel: 0,
    customizations: [],
  });

  const [customizationInput, setCustomizationInput] = useState({
    title: '',
    required: false,
    options: [{ name: '', price: 0 }],
  });

  const categories = [
    'Starters',
    'Main Course',
    'Pizzas',
    'Burgers',
    'Biryani',
    'Chinese',
    'Pasta',
    'Desserts',
    'Beverages',
    'Salads',
  ];

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        imagePreview: item.image,
        customizations: item.customizations || [],
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleAddCustomization = () => {
    if (customizationInput.title && customizationInput.options[0].name) {
      setFormData({
        ...formData,
        customizations: [...formData.customizations, customizationInput],
      });
      setCustomizationInput({
        title: '',
        required: false,
        options: [{ name: '', price: 0 }],
      });
    }
  };

  const handleRemoveCustomization = (index) => {
    const updated = formData.customizations.filter((_, i) => i !== index);
    setFormData({ ...formData, customizations: updated });
  };

  const handleAddOption = () => {
    setCustomizationInput({
      ...customizationInput,
      options: [...customizationInput.options, { name: '', price: 0 }],
    });
  };

  const handleOptionChange = (index, field, value) => {
    const updated = customizationInput.options.map((opt, i) =>
      i === index ? { ...opt, [field]: value } : opt
    );
    setCustomizationInput({ ...customizationInput, options: updated });
  };

  const handleRemoveOption = (index) => {
    if (customizationInput.options.length > 1) {
      const updated = customizationInput.options.filter((_, i) => i !== index);
      setCustomizationInput({ ...customizationInput, options: updated });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      className="menu-form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="menu-form-container"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
      >
        <div className="form-header">
          <h2>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
          <IconButton onClick={onClose} className="close-btn">
            <Close />
          </IconButton>
        </div>

        <form onSubmit={handleSubmit} className="menu-form">
          {/* Image Upload */}
          <div className="image-upload-section">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload" className="image-upload-label">
              {formData.imagePreview ? (
                <div className="image-preview">
                  <img src={formData.imagePreview} alt="Preview" />
                  <div className="image-overlay">
                    <CloudUpload />
                    <span>Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="image-placeholder">
                  <CloudUpload />
                  <p>Upload Item Image</p>
                  <span>PNG, JPG up to 5MB</span>
                </div>
              )}
            </label>
          </div>

          {/* Basic Info */}
          <div className="form-grid">
            <TextField
              fullWidth
              label="Item Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Restaurant className="input-icon" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth className="form-input">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                startAdornment={
                  <InputAdornment position="start">
                    <Category className="input-icon" />
                  </InputAdornment>
                }
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-input"
          />

          {/* Pricing */}
          <div className="form-grid">
            <TextField
              fullWidth
              type="number"
              label="Price (₹)"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoney className="input-icon" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type="number"
              label="Original Price (Optional)"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              className="form-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOffer className="input-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Additional Info */}
          <div className="form-grid">
            <TextField
              fullWidth
              label="Preparation Time (e.g., 15-20 min)"
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleChange}
              className="form-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Timer className="input-icon" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth className="form-input">
              <InputLabel>Spice Level</InputLabel>
              <Select
                name="spiceLevel"
                value={formData.spiceLevel}
                onChange={handleChange}
              >
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={1}>🌶️ Mild</MenuItem>
                <MenuItem value={2}>🌶️🌶️ Medium</MenuItem>
                <MenuItem value={3}>🌶️🌶️🌶️ Hot</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Switches */}
          <div className="form-switches">
            <FormControl component="fieldset">
              <FormLabel component="legend">Food Type</FormLabel>
              <RadioGroup
                row
                name="isVeg"
                value={formData.isVeg}
                onChange={(e) =>
                  setFormData({ ...formData, isVeg: e.target.value === 'true' })
                }
              >
                <FormControlLabel value={true} control={<Radio />} label="🟢 Veg" />
                <FormControlLabel value={false} control={<Radio />} label="🔴 Non-Veg" />
              </RadioGroup>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  name="isAvailable"
                  color="success"
                />
              }
              label="Available"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isBestseller}
                  onChange={handleChange}
                  name="isBestseller"
                  color="primary"
                />
              }
              label="Bestseller"
            />
          </div>

          {/* Customizations */}
          <div className="customizations-section">
            <h3>Customizations (Optional)</h3>
            
            {formData.customizations.map((custom, index) => (
              <div key={index} className="customization-item">
                <div className="customization-header">
                  <span>
                    <strong>{custom.title}</strong>
                    {custom.required && <Chip label="Required" size="small" color="error" />}
                  </span>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveCustomization(index)}
                  >
                    <Delete />
                  </IconButton>
                </div>
                <div className="customization-options">
                  {custom.options.map((opt, i) => (
                    <Chip
                      key={i}
                      label={`${opt.name} ${opt.price > 0 ? `(+₹${opt.price})` : ''}`}
                      size="small"
                    />
                  ))}
                </div>
              </div>
            ))}

            <div className="add-customization">
              <TextField
                fullWidth
                size="small"
                label="Customization Title (e.g., Size)"
                value={customizationInput.title}
                onChange={(e) =>
                  setCustomizationInput({ ...customizationInput, title: e.target.value })
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={customizationInput.required}
                    onChange={(e) =>
                      setCustomizationInput({
                        ...customizationInput,
                        required: e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label="Required"
              />

              <div className="options-list">
                {customizationInput.options.map((opt, index) => (
                  <div key={index} className="option-row">
                    <TextField
                      size="small"
                      label="Option Name"
                      value={opt.name}
                      onChange={(e) =>
                        handleOptionChange(index, 'name', e.target.value)
                      }
                    />
                    <TextField
                      size="small"
                      type="number"
                      label="Extra Price (₹)"
                      value={opt.price}
                      onChange={(e) =>
                        handleOptionChange(index, 'price', Number(e.target.value))
                      }
                    />
                    {customizationInput.options.length > 1 && (
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveOption(index)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </div>
                ))}
              </div>

              <div className="customization-actions">
                <Button
                  size="small"
                  startIcon={<Add />}
                  onClick={handleAddOption}
                >
                  Add Option
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddCustomization}
                >
                  Add Customization
                </Button>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <Button variant="outlined" onClick={onClose} size="large">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="submit-btn"
              size="large"
            >
              {item ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default MenuForm;