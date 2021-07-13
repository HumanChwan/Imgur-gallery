import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../assets/i.svg'

export default function NavBar() {
    return (
        <div className='navbar'>
            <div className='navbar-main'>
                <Logo className='navbar-main-logo' />
                <Link to='/home'>
                    <span className='navbar-main-text navbar-links'>kek</span>
                </Link>
            </div>
            <Link to='/home'>
                <span className='navbar-home navbar-links'>Home</span>
            </Link>
            <Link to='/gallery'>
                <span className="className='navbar-gallery navbar-links">
                    Gallery
                </span>
            </Link>
        </div>
    )
}
