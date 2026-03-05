import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Switch,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  FiberManualRecord,
  Star,
  Image,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleItemAvailability,
} from '../../../redux/slices/restaurantSlice';
import { toast } from 'react-toastify';
import './Menu.css';

const Menu = () => {
  const dispatch = useDispatch();
  const { menu } = useSelector(state => state.restaurant);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    originalPrice: '',
    image: '',
    isVeg: true,
    isAvailable: true,
    isBestseller: false,
    preparationTime: '',
  });

  const filteredItems = menu.items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenForm = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        originalPrice: item.originalPrice || '',
        image: item.image,
        isVeg: item.isVeg,
        isAvailable: item.isAvailable,
        isBestseller: item.isBestseller,
        preparationTime: item.preparationTime,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        originalPrice: '',
        image: '',
        isVeg: true,
        isAvailable: true,
        isBestseller: false,
        preparationTime: '',
      });
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast.error('Please fill all required fields');
      return;
    }

    const itemData = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
    };

    if (editingItem) {
      dispatch(updateMenuItem({ ...itemData, id: editingItem.id }));
      toast.success('Menu item updated successfully! ✅');
    } else {
      dispatch(addMenuItem(itemData));
      toast.success('Menu item added successfully! 🎉');
    }

    handleCloseForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteMenuItem(id));
      toast.success('Menu item deleted');
    }
  };

  const handleToggleAvailability = (id) => {
    dispatch(toggleItemAvailability(id));
  };

  const getCategoryCounts = () => {
    const counts = { All: menu.items.length };
    menu.items.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  return (
    <div className="menu-page-restaurant">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Menu Management</h1>
          <p>Add, edit, and manage your menu items</p>
        </div>
        <motion.button
          className="add-item-btn"
          onClick={() => handleOpenForm()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Add />
          Add New Item
        </motion.button>
      </div>

      {/* Search & Filters */}
      <div className="menu-controls">
        <TextField
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          className="search-field"
        />

        <div className="category-filters">
          {menu.categories.map((cat) => (
            <motion.button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
              <span className="cat-count">{categoryCounts[cat] || 0}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menu Stats */}
      <div className="menu-stats">
        <div className="stat-box">
          <span className="stat-number">{menu.items.length}</span>
          <span className="stat-label">Total Items</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{menu.items.filter(i => i.isAvailable).length}</span>
          <span className="stat-label">Available</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{menu.items.filter(i => !i.isAvailable).length}</span>
          <span className="stat-label">Out of Stock</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{menu.items.filter(i => i.isBestseller).length}</span>
          <span className="stat-label">Bestsellers</span>
        </div>
      </div>

      {/* Menu Items Grid */}
      <Grid container spacing={3}>
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card className={`menu-item-card ${!item.isAvailable ? 'unavailable' : ''}`}>
                  <div className="item-image-section">
                    <img src={item.image} alt={item.name} />
                    <div className="image-overlay">
                      <IconButton 
                        className="edit-btn"
                        onClick={() => handleOpenForm(item)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                    {item.isBestseller && (
                      <Chip
                        icon={<Star />}
                        label="Bestseller"
                        className="bestseller-chip"
                      />
                    )}
                    <div className={`veg-badge ${item.isVeg ? 'veg' : 'non-veg'}`}>
                      <FiberManualRecord />
                    </div>
                  </div>

                  <CardContent>
                    <div className="item-header">
                      <h3>{item.name}</h3>
                      <div className="availability-toggle">
                        <Switch
                          checked={item.isAvailable}
                          onChange={() => handleToggleAvailability(item.id)}
                          color="success"
                          size="small"
                        />
                      </div>
                    </div>

                    <p className="item-description">{item.description}</p>

                    <div className="item-meta">
                      <Chip 
                        label={item.category} 
                        size="small" 
                        className="category-chip"
                      />
                      <span className="prep-time">⏱️ {item.preparationTime}</span>
                    </div>

                    <div className="item-price">
                      <span className="current-price">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="original-price">₹{item.originalPrice}</span>
                      )}
                    </div>

                    {!item.isAvailable && (
                      <div className="unavailable-badge">Currently Unavailable</div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* No Items */}
      {filteredItems.length === 0 && (
        <div className="no-items">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png" alt="No items" />
          <h3>No menu items found</h3>
          <p>Try adjusting your search or add a new item</p>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={showForm}
        onClose={handleCloseForm}
        maxWidth="md"
        fullWidth
        className="menu-form-dialog"
      >
        <DialogTitle>
          {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Item Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category *</InputLabel>
                <Select
                  value={formData.category}
                  label="Category *"
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {menu.categories.filter(c => c !== 'All').map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price *"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Original Price"
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Preparation Time"
                placeholder="e.g., 15-20 min"
                value={formData.preparationTime}
                onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="form-checkboxes">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isVeg}
                      onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                      color="success"
                    />
                  }
                  label="Vegetarian"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isAvailable}
                      onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    />
                  }
                  label="Available"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isBestseller}
                      onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                      color="warning"
                    />
                  }
                  label="Bestseller"
                />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" className="submit-btn">
            {editingItem ? 'Update Item' : 'Add Item'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Menu;