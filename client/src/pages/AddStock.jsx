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
    quantityIn: "",
    price:0,
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
    <section className='min-h-screen  bg-zinc-100 drop-shadow-xl flex flex-col justify-center items-center gap-4'>
      <div className='flex flex-col justify-center items-center bg-white shadow-2xl rounded-md p-6 md:w-1/2 w-full  m-4 md:my-20 py-12'>
        <ToastContainer/>
        <div className='text-2xl font-semibold text-blue-950 text-shadow-2xl text-shadow-red-500'>
          <h1>Add Stocks in Inventory</h1>
        </div>

        <form onSubmit={onAddStock} className='flex flex-col gap-4 mt-6 w-full space-y-4'>
          <div className=' '>
            <label htmlFor="itemName">Item Name</label>
            <input type="text"
            className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
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
            className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
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
              className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
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
            className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              name='quantityIn'
              id='quantityIn'
              required
              value={addStock.quantityIn}
              onChange={handleInput}
              placeholder='Pieces'
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input type="number"
              name='price'
              className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              id='price'
              required
              value={addStock.price}
              onChange={handleInput}
              placeholder='100'
            />
          </div>
          <div className='flex justify-center items-center mt-4'>
            <button type="submit" className='bg-blue-500 w-full py-4 rounded-lg text-white text-xl font-semibold'>{load ? <Progress /> : "Add in Stock"}</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddStock