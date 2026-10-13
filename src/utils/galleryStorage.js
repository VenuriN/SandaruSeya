const STORAGE_KEY = 'sandaruseya-uploaded-photos'

export const getUploadedPhotos = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export const saveUploadedPhotos = (photos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos))
}
