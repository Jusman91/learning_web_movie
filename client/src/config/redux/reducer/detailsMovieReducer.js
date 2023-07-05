const initialState = {
  currentDetails: {},
  crew: [],
  season: [],
  reviews: [],
  media: 'most popular',
  onScrolled: false,
  videos: [],
  backdrops: [],
  posters: [],
  similarMovies: [],
  recommendationMovies: [],
}

const detailsMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DATA_DETAILS':
      return {
        ...state,
        currentDetails: action.payload
      }
    case 'UPDATE_DATA_CREW':
      return {
        ...state,
        crew: action.payload
      }
    case 'UPDATE_DATA_SEASON':
      return {
        ...state,
        season: action.payload
      }
    case 'UPDATE_DATA_REVIEWS':
      return {
        ...state,
        reviews: action.payload
      }
    case 'UPDATE_DATA_MEDIA':
      return {
        ...state,
        dataMedia: action.payload
      }
    case 'UPDATE_TYPE_MEDIA':
      return {
        ...state,
        media: action.payload
      }
    case 'ON_SCROLL':
      return {
        ...state,
        onScrolled: action.payload
      }
    case 'UPDATE_DATA_VIDEOS':
      return {
        ...state,
        videos: action.payload
      }
    case 'UPDATE_DATA_BACKDROPS':
      return {
        ...state,
        backdrops: action.payload
      }
    case 'UPDATE_DATA_POSTERS':
      return {
        ...state,
        posters: action.payload
      }
    case 'UPDATE_DATA_SIMILAR_MOVIES':
      return {
        ...state,
        similarMovies: action.payload
      }
    case 'UPDATE_DATA_RECOMMENDATION_MOVIES':
      return {
        ...state,
        recommendationMovies: action.payload
      }
    case 'RESET_DETAILS_STATE':
      return {
        ...state,
        media: initialState.media,
        onScrolled: initialState.onScrolled
      }
    default:
      return state
  }
}

export default detailsMovieReducer;