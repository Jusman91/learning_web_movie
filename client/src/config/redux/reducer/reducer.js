import { combineReducers } from "redux";
import detailsMovieReducer from "./detailsMovieReducer";
import trailersReducer from "./trailersReducer";
import loadingReducer from './loadingReducer'

const reducer = combineReducers({ detailsMovieReducer, trailersReducer, loadingReducer });

export default reducer;