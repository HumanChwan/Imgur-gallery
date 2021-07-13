import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../assets/i.svg'

export default function NavBar() {
    return (
        <div className='navbar'>
            <div className='navbar_main'>
                <Logo className='navbar_main_logo' />
                <Link to='/home'>
                    <span className='navbar_main_text navbar_links'>kek</span>
                </Link>
            </div>
            <Link to='/home'>
                <span className='navbar_home navbar_links'>Home</span>
            </Link>
            <Link to='/gallery'>
                <span className="className='navbar_gallery navbar_links">
                    Gallery
                </span>
            </Link>
        </div>
    )
}
