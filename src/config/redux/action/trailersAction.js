export const setPlayMediaInHero = (payload) => {
  return { type: 'PLAY_MEDIA_IN_HERO', payload }
}
export const setPlayMedia = (payload) => {
  return { type: 'PLAY_MEDIA', payload }
}
export const setKeyVideos = (payload) => {
  return { type: 'UPDATE_DATA_KEY_VIDEOS', payload }
}
export const setTitleVideos = (payload) => {
  return { type: 'GET_TITLE_VIDEOS', payload }
}