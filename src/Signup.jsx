import React from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Signup = () => {

    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value

        const body = {
            username,
            email,
            password
        }

        const url = BACKEND_URL + '/api/signup'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        if (password !== confirmPassword) {
            console.log('Passwords do not match!')
            return
        }

        const res = await fetch(url, options)
        const data = await res.json()
        console.log(data)
    }

    return (
        <div >
            <h1 className='text-center'>Sign Up</h1>
            <form className='col mx-auto flex justify-content-center' onSubmit={handleSubmit}>
                <input type='text' className='form-control' name='username' placeholder='Username' />
                <input type='text' className='form-control' name='email' placeholder='Email' />
                <input type='password' className='form-control' name='password' placeholder='Password' />
                <input type='password' className='form-control' name='confirmPassword' placeholder='Confirm your password' />
                <button className='btn btn-primary mx-auto'>Submit</button>
            </form>
        </div>
    )
}

export default Signup