import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import Hero from "../../components/header/hero/Hero";
import PartTopDitails from "../../components/main_content/details/PartTopDetails";
import TrailerPlayer from "../../components/main_content/movie_list/trailers/TrailerPlayer";
import Credits from "../../components/main_content/credits/Credits";
import PartMiddleDetails from "../../components/main_content/details/PartMiddleDetails";
import PartBottom from "../../components/main_content/details/PartBottom";
import './index.css';
import { resetDetailsState, setDataDetails } from "../../config/redux/action";

const MovieDetails = () => {
  const params = useParams();
  const id = params.movieid || '';
  const _media_type = params.mediatype || '';

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loadingReducer)
  const { playMediaInHero, playMedia } = useSelector(
    (state) => state.trailersReducer,
  );

  useEffect(() => {
    dispatch(setDataDetails(_media_type, id))
    dispatch(resetDetailsState());
    window.scrollTo(0, 0);
  }, [dispatch, _media_type, id]);

  return (
    <>
      {loading ? (
        <Loading type='component' />
      ) : (
        <section className='container_details'>
          <Hero />
          <div className='top'>
            <PartTopDitails />
            {playMediaInHero && <TrailerPlayer inHero />}
          </div>
          <div className='middle'>
            <Credits id={id} _media_type={_media_type} />
            <PartMiddleDetails
              id={id}
              _media_type={_media_type}
            />
            {playMedia && <TrailerPlayer />}
          </div>
          <div className='bottom'>
            <PartBottom _media_type={_media_type} />
          </div>
        </section>
      )}
    </>
  )
}

export default MovieDetails