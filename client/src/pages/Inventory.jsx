import React, { useEffect, useState } from 'react';
import './css/Inventory.css';
import { useAuth } from '../store/auth';

const Inventory = () => {
  const { user, items, getStockData, getUserData } = useAuth();

  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

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

  // Display loading state
  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  // Handle case when no items are available
  if (!items || items.length === 0) {
    return <p>No stock items available.</p>;
  }

  return (
    <section>
      <div className='container inventory'>
        <h1>Stocks In Your Shop</h1>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Category</th>
              <th>Quantity In</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{item.itemCategory}</td>
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
