import axios from "axios";

export const setDataDetails = (_media_type, id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/${_media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=credits,reviews,videos,images,similar,recommendations`
      );
      const results = response.data;
      const credits = results.credits.crew;
      const reviews = results.reviews.results[0];
      const videos = results.videos.results;
      const backdrops = results.images.backdrops;
      const posters = results.images.posters;
      const similar = results.similar.results;
      const recommendations = results.recommendations.results;
      dispatch({ type: 'UPDATE_DATA_DETAILS', payload: results });
      dispatch({ type: 'UPDATE_DATA_CREW', payload: credits });
      dispatch({
        type: 'UPDATE_DATA_REVIEWS',
        payload: reviews,
      });
      dispatch({
        type: 'UPDATE_DATA_VIDEOS',
        payload: videos,
      });
      dispatch({
        type: 'UPDATE_DATA_BACKDROPS',
        payload: backdrops,
      });
      dispatch({
        type: 'UPDATE_DATA_POSTERS',
        payload: posters,
      });
      dispatch({
        type: 'UPDATE_DATA_SIMILAR_MOVIES',
        payload: similar,
      });
      dispatch({
        type: 'UPDATE_DATA_RECOMMENDATION_MOVIES',
        payload: recommendations,
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (err) {
      console.error(err, '<==== get data details failed ====>');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
};

export const setMedia = (payload) => {
  return { type: 'UPDATE_TYPE_MEDIA', payload };
}
export const setScrolled = (payload) => {
  return { type: 'ON_SCROLL', payload };
}


