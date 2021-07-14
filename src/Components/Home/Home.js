import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { acceptedFormats, isImageType, validFormat } from '../../Util/util'
import Loading from '../Loading'

export default function Home() {
    const [files, setFiles] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isImage, setIsImage] = useState(true)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)

    async function uploadFile(file) {
        const headers = new Headers()

        headers.append(
            'Authorization',
            'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN
        )

        const type = isImage ? 'image' : 'video'

        const formData = new FormData()
        formData.append(type, file)
        console.log(file)

        const response = await fetch(
            process.env.REACT_APP_BASE_URL + '/' + type,
            {
                method: 'POST',
                body: formData,
                headers: headers,
            }
        )

        const parsed = await response.json()

        if (!parsed.success) {
            // error
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (files.length === 0) {
            console.log('error')
        }

        setIsLoading(true)
        await uploadFile(files[0]).catch((err) => {
            console.log(err)
            history.push('/error')
        })
        setIsLoading(false)

        setFiles([])
        setInputValue('')
    }

    function handlePreUpload(e) {
        if (e.target.files.length === 0) return

        if (!validFormat(e.target.files[0].type)) {
            console.log('file type err')
            setFiles([])
            setInputValue('')
            return
        }

        setIsImage(isImageType(e.target.files[0].type))
        setInputValue(e.target.value)
        console.log(e.target.files)
        setFiles([...e.target.files])
    }

    return (
        <div>
            {isLoading && <Loading>Uploading...</Loading>}
            <form>
                <div>
                    <label htmlFor='fileInput'> input: </label>{' '}
                    <input
                        type='file'
                        id='fileInput'
                        name='fileInput'
                        accept={acceptedFormats.join(', ')}
                        files={files}
                        value={inputValue}
                        onChange={handlePreUpload}
                    />
                </div>
                <button onClick={handleSubmit}>Upload!</button>
            </form>
        </div>
    )
}
