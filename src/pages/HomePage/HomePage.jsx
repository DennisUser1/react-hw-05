import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { getTrendingMovies } from "../../services/tmdbMovieAPI.js";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default function HomePage() {
    const [movieData, setMovieData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [isLoadingMore, setIsLoadingMore] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (currentPage == 1) {
                    setIsLoading(true);
                } else {
                    setIsLoadingMore(true);
                }
                const data = await getTrendingMovies(currentPage);
                setMovieData((prev) => [...prev, ...data.results]);
                setTotalPages(data.total_pages);
            } catch {
                showErrorToast();
            } finally {
                setIsLoading(false);
                setIsLoadingMore(false);
            }
        };

        fetchMovies();
    }, [currentPage]); 

    const showErrorToast = () => {
        iziToast.error({
            title: "Error",
            message: "An error occurred while fetching movies. Please try again.",
            position: window.innerWidth < 768 ? "bottom-center" : "top-right",
            timeout: 4000,
        });
    };

    const handleLoadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Trending Movies Today</h1>
            {isLoading && <Loader />}
            {movieData.length > 0 && <MovieList movies={movieData} />}
            {!isLoading && currentPage < totalPages && (
                <>
                    {!isLoadingMore && <LoadMoreBtn onClick={handleLoadMore} />}
                </>
            )}
        </div>
    );
};
