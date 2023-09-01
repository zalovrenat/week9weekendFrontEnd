import React from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Product = ({ product, user, addToCart }) => {

    const addToCartAPI = async (product_id) => {
        const res = await fetch(BACKEND_URL + '/api/cart/add', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product_id: product_id })
        })
        const data = await res.json()
        console.log(data)
        if (data.status === 'ok') {
        }
    }

    const handleClick = () => {
        addToCart(product)
        console.log(product)
        if (user.token) {
            addToCartAPI(product.product_id)
        }
    }

    return (
        <div className="card mx-auto mb-3" style={{ width: '18rem' }}>

            <img src={product.img_url ?? 'https://placeholder.com/150'} className="card-img-top" alt="..." />

            <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{product.price}</h6>
                <p className="card-text">{product.description}</p>
                <button className='btn btn-primary' onClick={handleClick}>Add To Cart</button>
            </div>
        </div>
    )
}

export default Product