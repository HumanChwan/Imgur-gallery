import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Loading from '../Loading'
import GalleryCard from './GalleryCard'

export default function Gallery() {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [images, setImages] = useState([])

    async function getGalleryImages() {
        const header = new Headers()
        header.append(
            'Authorization',
            `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`
        )

        const response = await fetch(process.env.REACT_APP_ACCOUNT_IMAGES_URL, {
            method: 'GET',
            headers: header,
        })

        const data = await response.json()

        setImages(data.data)
        setIsLoading(false)
    }

    useEffect(() => {
        if (isLoading) {
            getGalleryImages().catch((err) => {
                console.log(err)
                history.push('/error')
            })
        }
        // eslint-disable-next-line
    }, [isLoading])

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='gallery-root'>
                    <h2>Gallery Bois:</h2>
                    <div className='gallery'>
                        {images.map((metaDataImage, key) => {
                            return (
                                <GalleryCard
                                    key={key}
                                    imgData={metaDataImage}
                                    setIsLoading={setIsLoading}
                                />
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
