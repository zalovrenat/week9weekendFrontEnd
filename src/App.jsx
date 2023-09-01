import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Signup from './Signup'
import Login from './Login'
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom'
import Shop from './Shop'
import Cart from './Cart'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])

  const logMeIn = (user) => {
    setUser(user)
  }

  const logMeOut = () => {
    setUser({})
    return redirect('/login')
  }

  const getCartQuantity = () => {
    let quantity = 0
    for (let item of cart) {
      quantity += item.quantity
    }
    return quantity
  }

  const getTotal = () => {
    let total = 0
    for (let item of cart) {
      total += item.price*item.quantity
    }
    return total.toFixed(2)
  }

  const addToCart = (product) => {
    const newCart = [...cart]
    for (let item of newCart) {
      if (item.product_id === product.product_id) {
        item.quantity += 1
        setCart(newCart)
        return
      }
    }
    product.quantity = 1
    newCart.push(product)
    setCart(newCart)
  }

  const removeOneFromCart = (product) => {
    const newCart = [...cart]
    console.log('new cart',newCart)
    for (let item of newCart) {
      if (item.product_id === product.product_id & item.quantity >= 2) {
        item.quantity -= 1
      }
      else if (item.product_id === product.product_id & item.quantity < 2) {
        removeAllFromCart(product)
      }
    }
    setCart(newCart)
  }

  const removeAllFromCart = (product) => {
    const newCart = [...cart]
    for (let item of newCart) {
      if (item.product_id === product.product_id) {
        const newestCart = cart.filter(item => item.product_id !== product.product_id)
        setCart(newestCart)
      }
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartAPI = async (user) => {
    if (user.token) {
      const res = await fetch(BACKEND_URL + '/api/cart',{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const data = await res.json()
      console.log(data)
      if (data.status === 'ok') {
        setCart(data.cart)
      }
    }
    else {
      setCart([])
    }
  }

  useEffect(()=>{
    getCartAPI(user)
  },[user])

  useEffect(()=>{
    getCartQuantity()
    getTotal()
  },[cart])

  return (
    <BrowserRouter>

      <div className="App">
        <Navbar logMeIn={logMeIn} logMeOut={logMeOut} getCartQuantity={getCartQuantity} user={user} getTotal={getTotal} />
        <Routes>
          <Route path='/login' element={<Login logMeIn={logMeIn} user={user} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/shop' element={<Shop user={user} addToCart={addToCart} />} />
          <Route path='/cart' element={<Cart user={user} cart={cart} getTotal={getTotal} removeOneFromCart={removeOneFromCart} removeAllFromCart={removeAllFromCart} clearCart={clearCart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App