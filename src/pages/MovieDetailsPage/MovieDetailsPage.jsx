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

  const defaultImgDesktop = "https://dummyimage.com/1440x900/cdcdcd/000000.png&text=No+Image";
  const defaultImgTablet = "https://dummyimage.com/768x1024/cdcdcd/000000.png&text=No+Image";
  const defaultImgMobile = "https://dummyimage.com/375x812/cdcdcd/000000.png&text=No+Image";

  useEffect(() => {
    async function fetchMovieDetails() {
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
    fetchMovieDetails();
  }, [movieId]);

  const toggleFullscreen = (img) => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (img.requestFullscreen) {
        img.requestFullscreen();
      } else if (img.mozRequestFullScreen) {
        img.mozRequestFullScreen();
      } else if (img.webkitRequestFullscreen) {
        img.webkitRequestFullscreen();
      } else if (img.msRequestFullscreen) {
        img.msRequestFullscreen();
      }
    }
  };

  return (
    <section className={styles.movieDetails}>
      <Link className={styles.linkGoBack} to={backLink.current}>
        Go back
      </Link>
      {loading && <Loader />}
      {error && <NotFoundPage />}
      {!error && !loading && movieData && (
        <div className={styles.imageContainer}>
          <h1 className={styles.titleMobile}>{movieData.title}</h1>
          <img
            className={styles.image}
            srcSet={`
              ${movieData.backdrop_path || movieData.poster_path ? `https://image.tmdb.org/t/p/w300/${movieData.backdrop_path || movieData.poster_path}` : defaultImgMobile} 375w,
              ${movieData.backdrop_path || movieData.poster_path ? `https://image.tmdb.org/t/p/w780/${movieData.backdrop_path || movieData.poster_path}` : defaultImgTablet} 768w,
              ${movieData.backdrop_path || movieData.poster_path ? `https://image.tmdb.org/t/p/original/${movieData.backdrop_path || movieData.poster_path}` : defaultImgDesktop} 1440w
            `}
            sizes="(max-width: 480px) 100vw, 
                   (max-width: 768px) 80vw, 
                   (min-width: 1024px) 70vw"
            src={
              movieData.backdrop_path || movieData.poster_path
                ? `https://image.tmdb.org/t/p/original/${movieData.backdrop_path || movieData.poster_path}`
                : defaultImgDesktop
            }
            alt={movieData.title}
            onClick={(e) => toggleFullscreen(e.currentTarget)}
          />
          <div className={styles.infoOverlay}>
          <h1 className={styles.titleDesktop}>{movieData.title}</h1>
            <div className={styles.details}>
              <span className={styles.rating}>
                <MdStar size={18} className={styles.iconStarDetail} />
                {movieData.vote_average.toFixed(1)} 
                <span className={styles.separator}>|</span>
              </span>
              <span className={styles.releaseDate}>
                <span className={styles.wordRelease}>Release:</span> {movieData.release_date}
              </span>
            </div>
          </div>
        </div>
      )}
      <h2 className={styles.infoMovieTitle}>Additional information</h2>

      <div className={styles.additionalContainer}>
        <h2 className={styles.infoTagline}>
          {movieData && movieData.tagline ? movieData.tagline : "No tagline available."}
        </h2>
        <h3 className={styles.subTitle}>Overview</h3>
        <span className={styles.overviewText}>
          {movieData && movieData.overview ? movieData.overview : "No overview available."}
        </span>
        <h3 className={styles.subTitle}>Genres</h3>
        <span className={styles.genreText}>
          {movieData && movieData.genres && movieData.genres.length > 0
            ? movieData.genres.map((genre) => genre.name).join(" | ")
            : "No genres available."}
        </span>
        <h3 className={styles.subTitle}>Duration</h3>
        <span className={styles.runtimeText}>
          {movieData && movieData.runtime ? `${movieData.runtime} minutes` : "Duration not available."}
        </span>
        <h3 className={styles.subTitle}>Country</h3>
        <span className={styles.countryText}>
          {movieData && movieData.production_countries && movieData.production_countries.length > 0
            ? movieData.production_countries.map((country) => country.name).join(", ")
            : "No country information available."}
        </span>
      </div>

      <ul className={styles.linksList}>
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
}
