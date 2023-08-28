import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({logMeIn,logMeOut,user,getCartQuantity,getTotal}) => {
    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="https://svgsilh.com/svg/294547.svg" alt="Logo" width="30" height="30" className="d-inline-block align-text-top" />
                            <span> The Shop</span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/Shop">Shop</Link>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Cart">Cart: {getCartQuantity()} | ${getTotal()}</Link>
                            </li>
                            {user.token ?
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Welcome, {user.username}!
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" onClick={logMeOut}>Log Out</a></li>
                                    </ul>
                                </li>
                                :
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Get Started
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/signup">Sign Up</a></li>
                                        <li><a className="dropdown-item" href="/login">Log In</a></li>
                                    </ul>
                                </li>}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar