import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieReviews } from "../../services/tmdbMovieAPI.js";
import Loader from "../Loader/Loader";
import styles from "./MovieReviews.module.css";

const defaultImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";  

export default function MovieReviews() {
  const { movieId } = useParams();
  
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [hasError, setHasError] = useState(null); 

  useEffect(() => {
    const getReviews = async () => {
      setIsLoading(true);
      setHasError(null);
      
      try {
        const response = await fetchMovieReviews(movieId);
        if (response.results.length === 0) {
          setHasError("No reviews available for this movie."); 
        } else {
          setReviewList(response.results); 
        }
      } catch {
        setHasError("Failed to fetch movie reviews. Please try again later."); 
      } finally {
        setIsLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {hasError && <p className={styles.error}>{hasError}</p>}
      {reviewList.length > 0 && (
        <ul className={styles.reviewsList}>
          {reviewList.map(({ id, author, content, author_details: { avatar_path, rating } }) => (
            <li className={styles.reviewItem} key={id}>
              <h3 className={styles.authorReviewName}>{'Author: ' + author}</h3>
              <div className={styles.reviewContentWrapper}>
                <img
                  className={styles.reviewImage}
                  src={avatar_path ? `https://image.tmdb.org/t/p/w300${avatar_path}` : defaultImg}
                  alt={author + ' avatar'}
                />
                <div className={styles.reviewContent}>
                  <p className={styles.reviewRating}>
                    Rating: 
                    <span className={styles.reviewRatingValue}>
                      {rating ? rating : 0}
                    </span>
                  </p>
                  <p className={styles.reviewDescription}>{content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
