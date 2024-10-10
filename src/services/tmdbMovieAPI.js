import axios from "axios";
const bearerToken = import.meta.env.VITE_ACCESS_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common['Authorization'] = `Bearer ${bearerToken}`;

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error.response || error.message);
  }
);

const options = {
  params: {
    language: "en-US",
  },
};

function handleApiError(error) {
  console.error("Error fetching data:", error);

  if (error.response) {
    const status = error.response.status;
    if (status == 404) {
      return "Data not found";
    } else if (status == 500) {
      return "Server error. Please try again later.";
    }
  }
  return "An unexpected error occurred.";
}

export async function fetchMoviesBySearchValue(searchValue, page = 1) {
  options.params = {
    query: searchValue,
    language: "en-US",
    page: page, 
  };

  try {
    const response = await axios.get("/search/movie", options);
    return {
      results: response.data.results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getTrendingMovies(page = 1) {
  try {
    const { data } = await axios.get(
      "trending/movie/day", 
      {
        ...options,
        params: {
          ...options.params,
          page,
        }
      }
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getDetailsMovie(movieId) {
  try {
    const response = await axios.get(`movie/${movieId}`, options);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getMovieCast(movieId) {
  try {
    const response = await axios.get(`movie/${movieId}/credits`, options);
    return response.data.cast;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getMovieReviews(movieId) {
  try {
    const response = await axios.get(`movie/${movieId}/reviews`, options);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getMovieTrailer(movieId) {
  try {
    const response = await axios.get(`movie/${movieId}/videos`, options);
    return response.data.results.find(video => video.type == "Trailer" && video.site == "YouTube");
  } catch (error) {
    throw handleApiError(error);
  }
} 