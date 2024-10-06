import { Link, useParams, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, Suspense } from "react";
import { getDetailsMovie } from "../../services/tmdbMovieAPI";  
import Loader from "../../components/Loader/Loader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { MdStar } from "react-icons/md"; 
import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLink = useRef(location.state || "/"); 

  const defaultImg =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

  useEffect(() => {
    async function handleClickMovie() {
      try {
        setLoading(true);
        const data = await getDetailsMovie(movieId);
        setMovieData(data); 
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    handleClickMovie();
  }, [movieId]);

  return (
    <section>
      <Link className={styles.linkGoBack} to={backLink.current}>
        Go back{" "}
      </Link>
      {loading && <Loader />}
      {error && <NotFoundPage />}
      {!error && !loading && movieData && ( 
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={
              movieData.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                : defaultImg
            }
            width={500}
            alt={movieData.title}
          />
          <div className={styles.infoOverlay}>
            <h1 className={styles.title}>{movieData.title}</h1>
            <div className={styles.details}>
              <span className={styles.rating}>
                <MdStar size={18} />
                {movieData.vote_average.toFixed(1)}
              </span>
              <span className={styles.separator}>|</span>
              <span className={styles.releaseDate}>
                Release: {movieData.release_date}
              </span>
            </div>
          </div>
        </div>
      )}
      <ul className={styles.links}>
        <li>
          <Link to="cast" className={styles.linkTo}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" className={styles.linkTo}>
            Reviews
          </Link>
        </li>
      </ul>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </section>
  );
};
