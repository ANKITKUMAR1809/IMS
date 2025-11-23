import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

const Sell = () => {
  const { user, getUserData, getStockData, items } = useAuth();

  const [sell, setSell] = useState({
    itemName: "",
    itemCategory: "",
    quantity: 1,
    quantityIn: "",
    date: ""
  });

  const [availableStock, setAvailableStock] = useState(0);
  const [isQuantityValid, setIsQuantityValid] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    getUserData();
    getStockData();
  }, []);

  // Extract unique categories
  useEffect(() => {
    if (items.length > 0) {
      setCategories([...new Set(items.map((i) => i.itemCategory))]);
    }
  }, [items]);

  // Select Category
  const handleCategorySelect = (cat) => {
    setSell({ ...sell, itemCategory: cat, itemName: "", quantityIn: "" });
    setFilteredItems(items.filter((i) => i.itemCategory === cat));
  };

  // Select Item
  const handleItemSelect = (itemName) => {
    const selected = filteredItems.find((i) => i.itemName === itemName);

    if (selected) {
      setSell({
        ...sell,
        itemName: selected.itemName,
        itemCategory: selected.itemCategory,
        quantityIn: selected.quantityIn,
      });

      setAvailableStock(selected.quantity);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      setIsQuantityValid(value <= availableStock);
    }

    setSell({
      ...sell,
      [name]: value,
    });
  };

  const onAddSell = async (e) => {
    e.preventDefault();

    if (!isQuantityValid) {
      alert("Quantity exceeds available stock");
      return;
    }

    try {
      const response = await fetch("https://ims-yxa0.onrender.com/api/sell/add-sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, ...sell }),
      });

      if (response.ok) {
        alert("Sell recorded");
        setSell({
          itemName: "",
          itemCategory: "",
          quantity: 1,
          quantityIn: "",
          date: ""
        });
      } else {
        alert("Failed to record the sell");
      }
    } catch (error) {
      alert("Server Unreachable");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-10">
        Sell Items
      </h1>

      <form
        onSubmit={onAddSell}
        className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md space-y-6"
      >
        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Item Category</label>
          <select
            required
            name="itemCategory"
            value={sell.itemCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select Category</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Item Name */}
        <div>
          <label className="block font-semibold mb-1">Item Name</label>
          <select
            required
            name="itemName"
            value={sell.itemName}
            onChange={(e) => handleItemSelect(e.target.value)}
            disabled={!sell.itemCategory}
            className="w-full border border-gray-300 rounded-md p-2 outline-none disabled:bg-gray-200"
          >
            <option value="">Select Item</option>
            {filteredItems.map((item) => (
              <option key={item._id} value={item.itemName}>
                {item.itemName}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-semibold mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={sell.quantity}
            onChange={handleInput}
            min="1"
            max={availableStock}
            required
            disabled={!sell.itemName}
            className="w-full border border-gray-300 rounded-md p-2 outline-none disabled:bg-gray-200"
          />

          {!isQuantityValid && (
            <p className="text-red-500 text-sm mt-1">
              Available Stock: {availableStock}
            </p>
          )}
        </div>

        {/* Quantity In */}
        <div>
          <label className="block font-semibold mb-1">Quantity In</label>
          <input
            type="text"
            name="quantityIn"
            value={sell.quantityIn}
            readOnly
            required
            className="w-full border border-gray-300 rounded-md p-2 outline-none bg-gray-200"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={sell.date}
            onChange={handleInput}
            required
            className="w-full border border-gray-300 rounded-md p-2 outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Sell the Item
        </button>
      </form>
    </section>
  );
};

export default Sell;
