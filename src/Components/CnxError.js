import React from 'react'
import { Link } from 'react-router-dom'

export default function CnxError() {
    return (
        <div className='error'>
            <div className='error_text'>
                There appears to be some network error :(
            </div>
            <div className='error_pre_link'>
                Return Back to:
                <Link to='/home'>
                    <span className='error_link'> Home</span>
                </Link>
            </div>
        </div>
    )
}
