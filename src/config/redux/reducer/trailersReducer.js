const initialState = {
  playMediaInHero: false,
  playMedia: false,
  keyVideos: '',
  titleVideos: '',
}

const trailersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAY_MEDIA_IN_HERO':
      return {
        ...state,
        playMediaInHero: action.payload
      }
    case 'PLAY_MEDIA':
      return {
        ...state,
        playMedia: action.payload
      }
    case 'UPDATE_DATA_KEY_VIDEOS':
      return {
        ...state,
        keyVideos: action.payload
      }
    case 'GET_TITLE_VIDEOS':
      return {
        ...state,
        titleVideos: action.payload
      }
    default:
      return state
  }
}

export default trailersReducer;