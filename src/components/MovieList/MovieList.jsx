import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <ul className={styles.listCard}>
      {movies.map(movie => (
        <li className={styles.item} key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
};