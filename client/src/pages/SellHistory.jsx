import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

const SellHistory = () => {
  const { user, getUserData, sellRecord, getSellRecord } = useAuth();

  // State to track if the user data has been loaded
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      await getUserData(); // Fetch user data
      setIsLoading(false); // Stop loading when done
    };

    fetchData();
  }, []);

  // New useEffect to fetch sell record once the user data is available
  useEffect(() => {
    if (user && user._id) {
      getSellRecord(); // Fetch sell records after user data is available
    }
  }, [user]); // Run when `user` is updated

  // Check if data is still loading
  if (isLoading) {
    return <p>Loading user data...</p>; // Display loading state
  }

  // Check if sell records are available
  if (!sellRecord || sellRecord.length === 0) {
    return <p>No sales history available.</p>; // Display message if no records found
  }

  return (
    <section>
      <div className='container inventory'>
        <h1>Previous Sales History of the Items</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Item Name</th>
              <th>Item Category</th>
              <th>Quantity In</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {sellRecord.map((item) => (
              <tr key={item._id}>
                <td>{item.date}</td>
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

export default SellHistory;
