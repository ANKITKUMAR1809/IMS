import React, { useEffect, useState } from 'react';
import './css/Inventory.css';
import Loading from '../components/Loading'
import { useAuth } from '../store/auth';

const Inventory = () => {
  const { user, items, getStockData, getUserData } = useAuth();
  
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  
  // State to handle search query
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for filtered items
  const [filteredItems, setFilteredItems] = useState([]);
  
  // Fetch user data on initial mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      await getUserData(); // Fetch user data
      setIsLoading(false); // Stop loading after user data is fetched
    };
    fetchData();
  }, []);

  // Fetch stock data after user data is available
  useEffect(() => {
    if (user && user._id) {
      getStockData(); // Fetch stock data after user is available
    }
  }, [user]); // Dependency on user

  // Update filtered items when the search query or items change
  useEffect(() => {
    if (items && items.length > 0) {
      const filtered = items.filter(item =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itemCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  // Display loading state
  if (isLoading) {
    return <section>
      <div className='container inventory'>
        <Loading/>
      </div>
      </section>
  }

  // Handle case when no items are available
  if (!items || items.length === 0) {
    return <section>
    <div className='container inventory'>
      <p> No Stocks Available in your Inventory.</p>
    </div>
    </section>
  }

  return (
    <section>
      <div className='container inventory'>
        <h1>Stocks In Your Shop</h1>
        
        {/* Search Input Box */}
        <div>
          <input
            type="text"
            placeholder="Search by Item Name or Category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-box"
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Item Category</th>
              <th>Item Name</th>
              <th>Quantity In</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {/* Filtered and Highlighted Results */}
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td>{item.itemCategory}</td>
                <td>{item.itemName}</td>
                <td>{item.quantityIn}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Inventory;
