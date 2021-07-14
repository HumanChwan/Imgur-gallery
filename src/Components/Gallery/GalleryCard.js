import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function GalleryCard({
    imgData,
    setFetchingData: setGalleryReload,
}) {
    const history = useHistory()
    const [actionLoad, setActionLoad] = useState(false)

    async function handleDeleteImage() {
        const header = new Headers()
        setActionLoad(true)
        header.append(
            'Authorization',
            `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
        )

        const response = await fetch(
            process.env.REACT_APP_ACCOUNT_URL + '/' + imgData.deletehash,
            {
                method: 'DELETE',
                headers: header,
            }
        )

        const parsed = await response.json()

        if (!parsed.success) {
            history.push('/error')
            return
        }
        setGalleryReload(true)
    }

    function handleClick(e) {
        e.preventDefault()
        handleDeleteImage().catch((err) => {
            console.log(err)
            history.push('/error')
        })
    }

    return (
        <div className={`gallery_card ${actionLoad && 'wait'}`}>
            <div className={`gallery_card_image ${actionLoad && 'fade'}`}>
                <img src={imgData.link} alt="Couldn't Load!" />
            </div>
            <button
                className={`gallery_card_button ${actionLoad && 'wait'}`}
                onClick={(e) => {
                    handleClick(e)
                }}
            >
                Delete
            </button>
        </div>
    )
}
