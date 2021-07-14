import React from 'react'

export default function Loading(props) {
    return (
        <div className='loading'>
            <div className='loading_main'>
                <div className='loading_main_circle'></div>
                <div className='loading_main_caption'>{props.children}</div>
            </div>
        </div>
    )
}
