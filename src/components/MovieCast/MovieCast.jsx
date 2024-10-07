import { useParams } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { getMovieCast } from "../../services/tmdbMovieAPI.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.css"; 
import Loader from "../Loader/Loader";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();

  const defaultImg =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasCast, setHasCast] = useState(true);

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieCast(movieId);
        if (!data.length) {
          iziToast.error({
            title: "Error",
            message: "No cast data available.",
            position: window.innerWidth < 768 ? 'bottomCenter' : 'topRight',
          });
          setHasCast(false);
          return;
        }
        const onlyActors = data.filter(actor => actor.known_for_department == "Acting");
        setActors(onlyActors);
        if (!onlyActors.length) {
          setHasCast(false);
        }
      } catch {
        setError("Unable to load cast data.");
        iziToast.error({
          title: "Error",
          message: "Unable to load cast data.",
          position: window.innerWidth < 768 ? 'bottomCenter' : 'topRight',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) return <Loader />;

  return (
    <div>
      {error && <p className={styles.errorCast}>{error}</p>}
      {!hasCast ? (
        <p className={styles.noCast}>No actors found for this movie.</p>
      ) : (
        <ul className={styles.list}>
          {actors.map(actor => (
            <li key={actor.id} className={styles.listItem}>
              <img
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : defaultImg}
                alt={actor.name}
                className={styles.actorImg}
                  style={
                    actor.profile_path
                      ? {}
                      : { width: '160px', height: '240px' } 
                  }
              />
              <p className={`${styles.actorName} ${styles.alternativeText}`}>
                {actor.name || "Name not available"}
              </p>
              <p className={`${styles.characterName} ${styles.alternativeText}`}>
                {actor.character ? `Character: ${actor.character}` : "Character: information not available"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

