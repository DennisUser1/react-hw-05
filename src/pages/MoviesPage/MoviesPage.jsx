import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesBySearchValue } from "../../services/tmdbMovieAPI.js"; 
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"; 
import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("query") ?? "";
  const page = Number(params.get("page")) || 1;

  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const disablePrev = page == 1;
  const disableNext = page >= totalPages;

  useEffect(() => {
    if (query == "") { 
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
  
        const { results, totalPages } = await fetchMoviesBySearchValue(query, page);
        if (results.length == 0) {
          showToast("No movies found for this query");
        } else {
          setMovies(results);
          setTotalPages(totalPages);
        }
      } catch {
        showToast("An error occurred while fetching movies.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const showToast = (message) => {
    const screenWidth = window.innerWidth;

    iziToast.show({
      title: "Notification",
      message: message,
      position: screenWidth < 768 ? "bottomCenter" : "topRight",
    });
  };

  function handleSearch(searchString) {
    setParams({ query: searchString, page: 1 });
    setMovies([]); 
  }

  const handlePrev = () => {
    if (page > 1) {
      setParams({ query, page: page - 1 }); 
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setParams({ query, page: page + 1 }); 
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Search Movies</h2>
      <SearchBar onSearch={handleSearch} />
      {!isLoading && movies.length > 0 && (
        <>
          <MovieList movies={movies} />
          <div className={styles.pagination}>
            <button
              className={styles.prevNextBtn}
              onClick={handlePrev}
              disabled={disablePrev}
            >
              Previous
            </button>
            
            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>

            <button
              className={styles.prevNextBtn}
              onClick={handleNext}
              disabled={disableNext}
            >
              Next
            </button>
          </div>
        </>
      )}
      {isLoading && (
        <div className={styles.loaderWrapperPage}>
          <div className={styles.loaderContentWrapper}>
            <Loader /> 
            <p className={styles.loadingText}>Searching...</p> 
          </div>
        </div>
      )}
    </div>
  );
};
