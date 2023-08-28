import React, { useState, useEffect } from 'react'
import Product from './Product'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Shop = ({ user, addToCart }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        const res = await fetch(BACKEND_URL + '/api/products')
        const data = await res.json()

        console.log(data)
        if (data.status === 'ok') {
            setProducts(data.products)
        }
    }

    const showProducts = () => {
        return products.map(p => <Product key={p.product_id} product={p} user={user} addToCart={addToCart} />)
    }

    return (
        <div>
            <h1>Shop</h1>
            <main className='container justify-content-center row'>
                {showProducts()}
            </main>
        </div>
    )
}

export default Shop