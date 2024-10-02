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
  if (error.status == 404) {
    return "Data not found";
  } else if (error.status == 500) {
    return "Server error. Please try again later.";
  } else {
    return "An unexpected error occurred.";
  }
}

export async function fetchMoviesBySearchValue(searchValue) {
  try {
    const response = await axios.get(
      `search/movie?page=1&query=${searchValue}`,
      options
    );
    return response.data.results;
  } catch (error) {
    throw handleApiError(error);
  }
}

export async function getTrendingMovies() {
  try {
    const response = await axios.get("trending/movie/week", options);
    return response.data.results;
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
