import axios from "axios";

const  tmdbToken  = import.meta.env.VITE_TMDB_TOKEN;

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/", 
});

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: tmdbToken
  },
};