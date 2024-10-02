import React, { useEffect, useState } from 'react';
import './css/UpdateStock.css'
import { useAuth } from '../store/auth';
import Loading from '../components/Loading'

const UpdateStock = () => {
  const { user, items, getStockData, getUserData } = useAuth();

  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  const [updateData, setUpdateData] = useState({
    stockId: "",
    itemName: "",
    itemCategory: "",
    quantity: "",
    quantityIn: "",
  })
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
  const onClickTr = (id, ic, inm, qi, q) => {
    setUpdateData({
      stockId: id,
      itemName: inm,
      itemCategory: ic,
      quantity: q,
      quantityIn: qi,
    })
  }
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdateData({
      ...updateData,
      [name]: value,
    })
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(updateData)
    try {
      const response = await fetch("https://ims-yxa0.onrender.com/api/stock/update-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      })
      console.log(response)
      if (response.ok) {
        alert("Stock Updated")
        setUpdateData({
          stockId: "",
          itemName: "",
          itemCategory: "",
          quantity: "",
          quantityIn: "",
        })
      }
      else {
        alert("Try Again ,something went wrong")
      }
    } catch (error) {
      alert("Server Unreachable")
    }
  }
  // Display loading state
  if (isLoading) {
    return <section>
      <div className='container inventory'>
        <Loading />
      </div>
    </section>
  }

  // Handle case when no items are available
  if (!items || items.length === 0) {

    return <section>
      <div className='container inventory'>
        <p> No data available</p>
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
        <div className="update-stock">
          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="itemName">Item Name</label>
              <input type="text" value={updateData.itemName} name='itemName' onChange={handleOnChange} />
            </div>

            <div>
              <label htmlFor="itemCategory">Item Category</label>
              <input type="text" value={updateData.itemCategory} name='itemCategory' onChange={handleOnChange} />
            </div>

            <div>
              <label htmlFor="quantity">Quantity</label>
              <input type="number" value={updateData.quantity} name='quantity' onChange={handleOnChange} />
            </div>

            <div>
              <label htmlFor="quantityIn">Quantity In</label>
              <input type="text" value={updateData.quantityIn} name='quantityIn' onChange={handleOnChange} />
            </div>
            <div>
              <button type="submit" className='register-btn'>Update</button>

            </div>
          </form>

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
              <tr key={item._id} onClick={() => onClickTr(item._id, item.itemCategory, item.itemName, item.quantityIn, item.quantity)}>
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

export default UpdateStock;
