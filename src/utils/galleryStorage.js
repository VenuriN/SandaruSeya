const STORAGE_KEY = 'sandaruseya-uploaded-photos'
const DATABASE_NAME = 'sandaruseya-gallery'
const STORE_NAME = 'photos'

const openDatabase = () => new Promise((resolve, reject) => {
  const request = indexedDB.open(DATABASE_NAME, 1)
  request.onupgradeneeded = () => {
    if (!request.result.objectStoreNames.contains(STORE_NAME)) {
      request.result.createObjectStore(STORE_NAME, { keyPath: 'id' })
    }
  }
  request.onsuccess = () => resolve(request.result)
  request.onerror = () => reject(request.error)
})

export const getUploadedPhotos = async () => {
  const database = await openDatabase()
  const photos = await new Promise((resolve, reject) => {
    const request = database.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
  database.close()

  let legacyPhotos = []
  try {
    legacyPhotos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
  if (photos.length === 0 && legacyPhotos.length > 0) {
    await saveUploadedPhotos(legacyPhotos)
    localStorage.removeItem(STORAGE_KEY)
    return legacyPhotos
  }
  return photos
}

export const saveUploadedPhotos = async (photos) => {
  const database = await openDatabase()
  await new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    store.clear()
    photos.forEach(photo => store.put(photo))
    transaction.oncomplete = resolve
    transaction.onerror = () => reject(transaction.error)
    transaction.onabort = () => reject(transaction.error)
  })
  database.close()
}

export const compressPhoto = (file) => new Promise((resolve, reject) => {
  const image = new Image()
  const sourceUrl = URL.createObjectURL(file)
  image.onload = () => {
    const maxDimension = 3000
    const ratio = Math.min(1, maxDimension / Math.max(image.width, image.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(image.width * ratio)
    canvas.height = Math.round(image.height * ratio)
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
    URL.revokeObjectURL(sourceUrl)
    resolve(canvas.toDataURL('image/jpeg', 0.88))
  }
  image.onerror = () => {
    URL.revokeObjectURL(sourceUrl)
    reject(new Error('Could not read this image.'))
  }
  image.src = sourceUrl
})
