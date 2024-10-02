import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Progress from '../components/Progress';
const AddStock = () => {
  const { user, getUserData } = useAuth();
  const [addStock, setAddStock] = useState({
    itemName: "",
    itemCategory: "",
    quantity: 1,
    quantityIn: ""
  })
  const [load, setLoad] = useState(false)
  useEffect(() => {
    getUserData()
  }, [])

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setAddStock({
      ...addStock,
      [name]: value,
    })
  }
  const notify = (msg, success) => {
    if (success) {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };
  const onAddStock = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      const response = await fetch("https://ims-yxa0.onrender.com/api/stock/add-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          ...addStock
        })
      })

      if (response.ok) {
        notify("Item added to your stock", true); 
        setLoad(false)
        setAddStock({
          itemName: "",
          itemCategory: "",
          quantity: 1,
          quantityIn: ""
        })
      }
      else {
        notify("item is already in your stock go to update stocks", false); 
      }
    } catch (error) {
      console.log(error)
      notify("server unreachable, Can't add items", false); 
      
    }
    
    
  }
  
  return (
    <section>
      <div className='container register'>
        <ToastContainer/>
        <div>
          <h1>Add Stocks in Inventory</h1>
        </div>

        <form onSubmit={onAddStock} className='register-form'>
          <div>
            <label htmlFor="itemName">Item Name</label>
            <input type="text"
              required
              name="itemName"
              id='itemName'
              value={addStock.itemName}
              onChange={handleInput}
              placeholder='Pixel 6a'
            />
          </div>
          <div>
            <label htmlFor="itemCategory">Item Category</label>
            <input type="text" name="itemCategory" id="itemCategory"
              placeholder='Google Phone'
              required
              value={addStock.itemCategory}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input type="number"
              name='quantity'
              id='quantity'
              required
              value={addStock.quantity}
              onChange={handleInput}
              placeholder='10000'
            />
          </div>
          <div>
            <label htmlFor="quantityIn">Quantity In</label>
            <input type="text"
              name='quantityIn'
              id='quantityIn'
              required
              value={addStock.quantityIn}
              onChange={handleInput}
              placeholder='Pieces'
            />
          </div>
          <div>
            <button type="submit" className='register-btn'>{load ? <Progress /> : "Add in Stock"}</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddStock