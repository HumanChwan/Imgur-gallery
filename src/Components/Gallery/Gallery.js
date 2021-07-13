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
        cachifyImgs(data.data.map((imageData) => imageData.link))
    }

    async function cachifyImgs(ImgSrcs) {
        console.log('1')
        const promises = ImgSrcs.map((src) => {
            return new Promise((resolve, reject) => {
                const img = new Image()

                img.src = src
                img.onload = resolve
                img.onerror = reject
            })
        })

        console.log('2')
        await Promise.all(promises)
        console.log('3')

        setIsLoading(false)
    }

    useEffect(() => {
        console.log('4')
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
                    <h2>Gallery:</h2>
                    <div className='gallery'>
                        {images.map((metaDataImage, key) => {
                            return (
                                <GalleryCard
                                    key={key}
                                    imgData={metaDataImage}
                                    setFetchingData={setIsLoading}
                                />
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
