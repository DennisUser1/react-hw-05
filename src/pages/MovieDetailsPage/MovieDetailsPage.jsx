import { Link, useParams, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, Suspense } from "react";
import { getDetailsMovie, getMovieTrailer } from "../../services/tmdbMovieAPI";
import Loader from "../../components/Loader/Loader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { MdStar } from "react-icons/md";
import styles from "./MovieDetailsPage.module.css";
import Panzoom from "@panzoom/panzoom";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/");

  const defaultImg =
    "https://dummyimage.com/1440x900/cdcdcd/000000.png&text=No+Image";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getDetailsMovie(movieId);
        setMovieData(data);
        const trailerData = await getMovieTrailer(movieId);
        setTrailer(trailerData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);


  const toggleFullscreen = (img) => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement == img) {
        const panzoomInstance = Panzoom(img, {
          maxScale: 4,
          contain: "outside",
        });
        
        const wheelHandler = panzoomInstance.zoomWithWheel.bind(panzoomInstance);
        img.parentElement.addEventListener("wheel", wheelHandler);
        const touchStartHandler = (event) => {
          if (event.touches.length == 2) {
            const distance = Math.sqrt(
              (event.touches[0].clientX - event.touches[1].clientX) ** 2 +
              (event.touches[0].clientY - event.touches[1].clientY) ** 2
            );
            panzoomInstance.zoomIn(distance);
          }
        };

        img.parentElement.addEventListener("touchstart", touchStartHandler);
        
        document.addEventListener("fullscreenchange", () => {
          if (!document.fullscreenElement) {
            img.parentElement.removeEventListener("wheel", wheelHandler);
            img.parentElement.removeEventListener("touchstart", touchStartHandler);
          }
        });
      }
    };

  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    img.requestFullscreen();
    document.addEventListener("fullscreenchange", handleFullscreenChange);
  }
};

  return (
    <section className={styles.movieDetails}>
      <Link className={styles.linkGoBack} to={backLink.current}>
        Go back
      </Link>
      {loading && <Loader />}
      {error && <NotFoundPage />}
      {movieData && !loading && !error && (
        <div className={styles.imageContainer}>
          <h1 className={styles.titleMobile}>{movieData.title}</h1>
          <img
            className={styles.image}
            srcSet={`
              ${movieData.backdrop_path || movieData.poster_path ? `https://image.tmdb.org/t/p/w300/${movieData.backdrop_path || movieData.poster_path}` : defaultImg} 375w,
              ${movieData.backdrop_path || movieData.poster_path ? `https://image.tmdb.org/t/p/w780/${movieData.backdrop_path || movieData.poster_path}` : defaultImg} 768w,
              ${movieData.backdrop_path || movieData.poster_path ? `https://image.tmdb.org/t/p/original/${movieData.backdrop_path || movieData.poster_path}` : defaultImg} 1440w
            `}
            sizes="(max-width: 480px) 100vw, 
                   (max-width: 768px) 80vw, 
                   (min-width: 1024px) 70vw"
            src={
              movieData.backdrop_path || movieData.poster_path
                ? `https://image.tmdb.org/t/p/original/${movieData.backdrop_path || movieData.poster_path}`
                : defaultImg
            }
            alt={movieData.title}
            onClick={(e) => toggleFullscreen(e.currentTarget)}
          />
          {trailer && (
            <div className={styles.trailerContainer}>
              <h2>Watch Trailer</h2>
              <div className={styles.videoWrapper}>
                <iframe
                  className={styles.trailerVideo}
                  src={`https://www.youtube.com/embed/${trailer.key}?controls=1&showinfo=0&rel=0&origin=https://react-hw-05-chi.vercel.app/`}
                  title="Movie Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
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
          {movieData?.tagline || "No tagline available."}
        </h2>
        <h3 className={styles.subTitle}>Overview</h3>
        <span className={styles.overviewText}>
          {movieData?.overview || "No overview available."}
        </span>
        <h3 className={styles.subTitle}>Genres</h3>
        <span className={styles.genreText}>
          {movieData?.genres.length > 0
            ? movieData.genres.map((genre) => genre.name).join(" | ")
            : "No genres available."}
        </span>
        <h3 className={styles.subTitle}>Running time</h3>
        <span className={styles.runtimeText}>
          {movieData?.runtime ? `${movieData.runtime} minutes` : "Runtime not available."}
        </span>
        <h3 className={styles.subTitle}>Country</h3>
        <span className={styles.countryText}>
          {movieData?.production_countries.length > 0
            ? movieData.production_countries.map((country) => country.name).join(" | ")
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
};
