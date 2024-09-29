import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import './css/Sell.css';

const Sell = () => {
  const { user, getUserData, getStockData, items } = useAuth();
  const [sell, setSell] = useState({
    itemName: "", itemCategory: "", quantity: 1, quantityIn: "", date: ""
  });
  const [availableStock, setAvailableStock] = useState(0); // Store available quantity of selected item
  const [isQuantityValid, setIsQuantityValid] = useState(true); // Track if entered quantity is valid
  const [categories, setCategories] = useState([]); // Store all unique categories
  const [filteredItems, setFilteredItems] = useState([]); // Store filtered items based on category

  useEffect(() => {
    getUserData();
    getStockData();
  }, []);

  // Set unique categories from items
  useEffect(() => {
    if (items.length > 0) {
      const uniqueCategories = [...new Set(items.map(item => item.itemCategory))];
      setCategories(uniqueCategories);
    }
  }, [items]);

  // Handle category selection and filter items by the selected category
  const handleCategorySelect = (selectedCategory) => {
    setSell({ ...sell, itemCategory: selectedCategory, itemName: "", quantityIn: "" });
    const filtered = items.filter(item => item.itemCategory === selectedCategory);
    setFilteredItems(filtered);
  };

  // Handle item selection from the filtered items
  const handleItemSelect = (selectedItemName) => {
    const selectedItem = filteredItems.find(item => item.itemName === selectedItemName);

    if (selectedItem) {
      setSell({
        ...sell,
        itemName: selectedItem.itemName,
        itemCategory: selectedItem.itemCategory,
        quantityIn: selectedItem.quantityIn,
      });
      setAvailableStock(selectedItem.quantity); // Set available stock for validation
    }
  };

  // Handle input changes
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // If quantity is being updated, check if it's valid
    if (name === 'quantity') {
      setIsQuantityValid(value <= availableStock);
    }

    setSell({
      ...sell,
      [name]: value,
    });
  };

  // Handle form submission
  const onAddSell = async (e) => {
    e.preventDefault();

    // Prevent form submission if quantity is invalid
    if (!isQuantityValid) {
      alert("Quantity exceeds available stock.");
      return;
    }

    try {
      const response = await fetch("https://ims-yxa0.onrender.com/api/sell/add-sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user._id,
          ...sell
        })
      });

      if (response.ok) {
        alert("Sell recorded");
        setSell({
          itemName: "", itemCategory: "", quantity: "", quantityIn: "", date: ""
        });
      } else {
        alert("Failed to record the sell.");
      }
    } catch (error) {
      alert("Server Unreachable");
    }
  };

  return (
    <section className='sell'>
      <div>
        <h1>Create Sell Record</h1>
      </div>

      <form onSubmit={onAddSell} className='register-form'>
        {/* Dropdown for itemCategory */}
        <div>
          <label htmlFor="itemCategory">Item Category</label>
          <select
            required
            name="itemCategory"
            id='itemCategory'
            value={sell.itemCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for itemName, filtered by selected category */}
        <div>
          <label htmlFor="itemName">Item Name</label>
          <select
            required
            name="itemName"
            id='itemName'
            value={sell.itemName}
            onChange={(e) => handleItemSelect(e.target.value)}
            disabled={!sell.itemCategory} // Disable if category isn't selected
          >
            <option value="">Select an item</option>
            {filteredItems.map((item) => (
              <option key={item._id} value={item.itemName}>
                {item.itemName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name='quantity'
            id='quantity'
            required
            value={sell.quantity}
            onChange={handleInput}
            placeholder='Enter quantity'
            min="1"
            max={availableStock} // Ensure quantity doesn't exceed available stock
            disabled={!sell.itemName} // Disable until item is selected
          />
          {!isQuantityValid && (
            <p style={{ color: 'red' }}>Quantity exceeds available stock of {availableStock}</p>
          )}
        </div>

        <div>
          <label htmlFor="quantityIn">Quantity In</label>
          <input
            type="text"
            name='quantityIn'
            id='quantityIn'
            required
            value={sell.quantityIn}
            readOnly // Auto-selected, so make it read-only
          />
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name='date'
            id='date'
            required
            value={sell.date}
            onChange={handleInput}
          />
        </div>

        <div>
          <button type="submit" className='register-btn'>Sell the Items</button>
        </div>
      </form>
    </section>
  );
};

export default Sell;
