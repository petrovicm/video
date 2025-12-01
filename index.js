const startBtn = document.getElementById('start-btn')
const video = document.getElementById('video')
const canvas = document.getElementById('capture-canvas')
const photo = document.getElementById('photo')
const videoContainer = document.getElementById('video-container')
const snapshotContainer = document.getElementById('snapshot-container')

let stream = null
let timerId = null

function clearPreviewArea() {
    // hide media elements and clear any messages
    video.style.display = 'none'
    photo.style.display = 'none'
    // restore placeholders
    const vPlaceholder = videoContainer.querySelector('.media-placeholder')
    if (vPlaceholder) vPlaceholder.style.display = ''
    const sPlaceholder = snapshotContainer.querySelector('.media-placeholder')
    if (sPlaceholder) sPlaceholder.style.display = ''
    // remove any existing error node inside video container
    const existingErr = videoContainer.querySelector('.error')
    if (existingErr) existingErr.remove()
}

function showError(message) {
    clearPreviewArea()
    const err = document.createElement('div')
    err.className = 'error'
    err.textContent = message
    videoContainer.appendChild(err)
}

async function startCamera() {
    clearPreviewArea()

    try {
        stream = await navigator.mediaDevices.getUserMedia({video: true})
    } catch (err) {
        const userMessage = (err && err.name === 'NotAllowedError')
            ? 'Camera access denied. Please allow camera permissions and try again.'
            : 'Unable to access camera: ' + (err && err.message ? err.message : 'Unknown error')
        showError(userMessage)
        return
    }

    video.srcObject = stream
    // hide video placeholder and show video
    const vPlaceholder = videoContainer.querySelector('.media-placeholder')
    if (vPlaceholder) vPlaceholder.style.display = 'none'
    video.style.display = ''

    // Once video is playing, set dimensions and start timer to capture
    await video.play()

    // clear any previous timer
    if (timerId) {
        clearTimeout(timerId)
    }

    timerId = setTimeout(capturePhoto, 5000) // capture after 5s
}

function capturePhoto() {
    // ensure we have an active stream with at least one video track
    if (!stream || !stream.getVideoTracks().length) return

    const {videoWidth: w, videoHeight: h} = video
    if (!w || !h) {
        // fallback dimensions
        canvas.width = 640
        canvas.height = 480
    } else {
        canvas.width = w
        canvas.height = h
    }

    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    photo.src = canvas.toDataURL('image/png')
    photo.style.display = ''
    // hide snapshot placeholder
    const sPlaceholder = snapshotContainer.querySelector('.media-placeholder')
    if (sPlaceholder) sPlaceholder.style.display = 'none'

    // stop the camera after snapshot so the live preview stops and the
    // camera is released. stopCamera also clears any pending timers.
    stopCamera()
}

function stopCamera() {
    if (timerId) {
        clearTimeout(timerId)
        timerId = null
    }
    if (stream) {
        stream.getTracks().forEach(t => t.stop())
        stream = null
    }
    // leave the last photo visible; hide the video element
    video.style.display = 'none'
}

startBtn.addEventListener('click', () => {
    startCamera()
})
