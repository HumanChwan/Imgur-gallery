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
