import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
const AddStock = () => {
  const { user, getUserData } = useAuth();
  const [addStock, setAddStock] = useState({
    itemName: "",
    itemCategory: "",
    quantity: 1,
    quantityIn: ""
  })
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
  const onAddStock = async (e) => {
    e.preventDefault();
    console.log(user._id)
    console.log(addStock)
    try {
      const response = await fetch("https://ims-yxa0.onrender.com/api/stock/add-stock",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          userId:user._id,
          ...addStock
        })
      })

      if(response.ok){
        alert("Item added to your stock")
      }
      else{
        alert("item is already in your stock go to update stocks")
      }
    } catch (error) {
      console.log(error)
      alert("server unreachable, Can't add items")
    }


  }
  return (
    <section>
      <div className='container register'>
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
            <button type="submit" className='register-btn'>Add in Stocks</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddStock