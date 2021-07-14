export const acceptedFormats = [
    'image/*',
    'video/mp4',
    'video/webm',
    'video/mp4',
    'video/webm',
    'video/x-matroska',
    'video/quicktime',
    'video/x-flv',
    'video/x-msvideo',
    'video/x-ms-wmv',
    'video/mpeg',
]

const Status = {
    SUCCESS: ['File Uploaded Successfully!', 'home_status_success'],
    FAILED: [
        "File didn't upload, try again sometime later! :(",
        'home_status_failed',
    ],
    FILE_ERROR: ['Wrong File Type!!', 'home_status_fileErr'],
    EMPTY: ['No File Selected to Upload!', 'home_status_empty'],
}
Object.freeze(Status)

export function validFormat(format) {
    /*
        accepted format : 'image/*'
    */
    if (format.substr(0, 6) === 'image/') {
        return true
    }

    return acceptedFormats.includes(format)
}

export function isImageType(fileType) {
    return fileType.substr(0, 6) === 'image/'
}

export function setText(status) {
    const returnValue = Status[status]

    if (returnValue === undefined) {
        return ['', '']
    }

    return returnValue
}
