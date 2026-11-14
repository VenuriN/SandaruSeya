import { supabase } from '../lib/supabaseClient'

const BUCKET = 'gallery-photos'
const TABLE = 'gallery_photos'
const MAX_UPLOAD_BYTES = 30 * 1024 * 1024

const requireSupabase = () => {
  if (!supabase) throw new Error('Supabase is not configured. Add the project URL and publishable key.')
  return supabase
}

export const getUploadedPhotos = async () => {
  const client = requireSupabase()
  const { data, error } = await client.from(TABLE).select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data.map(photo => ({
    id: photo.id,
    url: photo.url,
    title: photo.title,
    collection: photo.collection,
    category: photo.category,
    album: photo.album || '',
    isFavorite: photo.is_favorite,
    date: photo.date_label
  }))
}

export const uploadPhoto = async (file, metadata) => {
  const client = requireSupabase()
  const id = crypto.randomUUID()
  const path = `${id}.jpg`
  const imageData = await compressPhoto(file)
  const response = await fetch(imageData)
  const blob = await response.blob()
  if (blob.size > MAX_UPLOAD_BYTES) {
    throw new Error('The compressed photo is larger than 30 MB. Choose a smaller photo and try again.')
  }
  const { error: uploadError } = await client.storage.from(BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    upsert: false
  })
  if (uploadError) throw uploadError

  const { data: { publicUrl } } = client.storage.from(BUCKET).getPublicUrl(path)
  const photo = {
    id,
    storage_path: path,
    url: publicUrl,
    title: metadata.title,
    collection: metadata.collection,
    category: metadata.category,
    album: metadata.album,
    is_favorite: metadata.isFavorite,
    date_label: metadata.date
  }
  const { error: insertError } = await client.from(TABLE).insert(photo)
  if (insertError) {
    await client.storage.from(BUCKET).remove([path])
    throw insertError
  }
  return {
    id,
    url: publicUrl,
    title: photo.title,
    collection: photo.collection,
    category: photo.category,
    album: photo.album,
    isFavorite: photo.is_favorite,
    date: photo.date_label
  }
}

export const deletePhoto = async (id) => {
  const client = requireSupabase()
  const { data: photo, error: readError } = await client.from(TABLE).select('storage_path').eq('id', id).single()
  if (readError) throw readError
  const { error: deleteError } = await client.from(TABLE).delete().eq('id', id)
  if (deleteError) throw deleteError
  const { error: storageError } = await client.storage.from(BUCKET).remove([photo.storage_path])
  if (storageError) throw storageError
}

export const saveUploadedPhotos = async (photos) => {
  const client = requireSupabase()
  const { error } = await Promise.all(photos.map(photo =>
    client.from(TABLE).update({ is_favorite: photo.isFavorite }).eq('id', photo.id)
  )).then(results => ({ error: results.find(result => result.error)?.error }))
  if (error) throw error
}

export const compressPhoto = (file) => new Promise((resolve, reject) => {
  const image = new Image()
  const sourceUrl = URL.createObjectURL(file)
  image.onload = () => {
    const maxDimension = 2400
    const ratio = Math.min(1, maxDimension / Math.max(image.width, image.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(image.width * ratio)
    canvas.height = Math.round(image.height * ratio)
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
    URL.revokeObjectURL(sourceUrl)
    resolve(canvas.toDataURL('image/jpeg', 0.82))
  }
  image.onerror = () => {
    URL.revokeObjectURL(sourceUrl)
    reject(new Error('Could not read this image.'))
  }
  image.src = sourceUrl
})
