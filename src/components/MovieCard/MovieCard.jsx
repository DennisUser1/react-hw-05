import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { MdStar } from "react-icons/md"; 
import styles from "./MovieCard.module.css";
import { useState } from 'react';

export default function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const releaseDate = movie.release_date
    ? format(new Date(movie.release_date), " (yyyy)")
    : "";
  const location = useLocation();
  const defaultImg =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

  return (
    <div className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      
      <Link to={`/movies/${movie.id}`} state={location} className={styles.link}>
        <div className={styles.imageBox}>
          {movie.poster_path ? (
            <img
              className={styles.posterImage}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <img
              className={styles.posterDefaultImage}
              src={defaultImg}
              alt="No poster available"
            />
          )}
        </div>
        <div className={styles.infoMovie}>
          <div className={styles.title}>
            {movie.title}
            {releaseDate}
          </div>
          <div className={styles.details}>
            <span className={styles.rating}>
              <MdStar size={18} className={styles.starIcon} style={{ fill: isHovered ? 'rgb(211, 137, 0)' : '#78828a' }}/> 
              <span className={styles.ratingText}>{movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : "N/A"}</span>
            </span>
            <span className={styles.separator}>|</span>
            <span className={styles.votes}>Votes: {movie.vote_count !== undefined ? movie.vote_count : 0}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
