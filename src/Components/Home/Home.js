import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    acceptedFormats,
    isImageType,
    setText,
    validFormat,
} from '../../Util/util'
import Loading from '../Loading'

export default function Home() {
    const [files, setFiles] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isImage, setIsImage] = useState(true)
    const history = useHistory()
    const [status, setStatus] = useState(setText(null))
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

        const response = await fetch(
            process.env.REACT_APP_BASE_URL + '/' + type,
            {
                method: 'POST',
                body: formData,
                headers: headers,
            }
        )

        const parsed = await response.json()

        setStatus(setText(parsed.success ? 'SUCCESS' : 'FAILED'))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (files.length === 0) {
            setStatus(setText('EMPTY'))
            return
        }

        setIsLoading(true)

        uploadFile(files[0])
            .then(() => {
                setIsLoading(false)
                setFiles([])
                setInputValue('')
            })
            .catch((err) => {
                console.log(err)
                history.push('/error')
            })
    }

    function handlePreUpload(e) {
        if (e.target.files.length === 0) return

        if (!validFormat(e.target.files[0].type)) {
            setStatus(setText('FILE_ERROR'))
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
        <div className='hoom-root'>
            {isLoading && <Loading>Uploading...</Loading>}
            <div className='home'>
                <form className='home_main'>
                    <label htmlFor='fileInput' className='home_main_label'>
                        Choose File to be Uploaded:{' '}
                    </label>{' '}
                    <input
                        type='file'
                        id='fileInput'
                        name='fileInput'
                        accept={acceptedFormats.join(', ')}
                        files={files}
                        value={inputValue}
                        onChange={handlePreUpload}
                        className='home_main_input'
                    />
                    <button onClick={handleSubmit} className='home_main_submit'>
                        Upload!
                    </button>
                </form>
                {/*
                    Classes: 
                        home_status_success
                        home_status_failed
                        home_status_fileErr
                        home_status_empty
                */}
                <div className={'home_status_bar ' + status[1]}>
                    {status[0]}
                </div>
            </div>
        </div>
    )
}
