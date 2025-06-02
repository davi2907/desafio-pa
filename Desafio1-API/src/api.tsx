import axios from "axios";

const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/",
  headers: {
    accept: "application/json",
    Authorization: tmdbToken
  }
});