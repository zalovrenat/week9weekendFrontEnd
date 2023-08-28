import React from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Cart = ({ user, cart, removeOneFromCart, removeAllFromCart, clearCart, getTotal }) => {

    const removeOneFromCartAPI = async (product) => {
        const res = await fetch(BACKEND_URL + '/api/cart/removeone', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: product.product_id })
        })
        const data = await res.json()
        console.log(data)
        if (data.status === 'ok') {
        }
    }

    const handleOneClick = (product) => {
        removeOneFromCart(product)
        if (user.token) {
            removeOneFromCartAPI(product)
        }
    }

    const removeAllFromCartAPI = async (product) => {
        const res = await fetch(BACKEND_URL + '/api/cart/removeall', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: product.product_id })
        })
        const data = await res.json()
        console.log(data)
        if (data.status === 'ok') {
        }
    }

    const handleAllClick = (product) => {
        removeAllFromCart(product)
        if (user.token) {
            removeAllFromCartAPI(product)
        }
    }

    const clearCartAPI = async () => {
        const res = await fetch(BACKEND_URL + '/api/cart/clear', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data)
        if (data.status === 'ok') {

        }
    }

    const handleClearClick = () => {
        clearCart()
        if (user.token) {
            clearCartAPI()
        }
    }

    return cart.length === 0 ? <h1>Your cart is empty.</h1> : (
        <div>
            <button className='btn btn-danger' onClick={() => handleClearClick()}>Clear Cart</button>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th></th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                        <th>Remove One</th>
                        <th>Remove All</th>
                    </tr>
                </thead>

                <tbody>
                    {cart.map(item => (
                        <tr key={item.product_id}>
                            <th>{item.product_id}</th>
                            <td>
                                <img src={item.img_url} style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>{item.product_name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>${item.quantity * item.price}</td>
                            <td>
                                <button className='btn btn-danger' onClick={() => handleOneClick(item)}>Remove One</button>
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={() => handleAllClick(item)}>Remove All</button>
                            </td>

                        </tr>
                    ))}
                    <tr>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>${getTotal()}</th>
                        <th></th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Cart