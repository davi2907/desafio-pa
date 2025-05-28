import { useEffect, useState } from "react";
import "../index.css"
import { fetchPopularMovies, fetchRecentMovies } from "../requestContent";

function Script1() {
  const [popularmovies, setPopularMovies] = useState<any[]>([]);
  const [trailermovies, setTrailerMovies] = useState<any[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularMovies, trailerMovies] = await Promise.all([
          fetchPopularMovies(),
          fetchRecentMovies(),
        ]);

        // Guarda os filmes nos respectivos locais
        setPopularMovies(popularMovies);
        setTrailerMovies(trailerMovies);

      } catch (error) {
        console.error(error);
        setErro("Erro ao buscar filmes.");
      }
    };

    fetchMovies();
  }, []);


  return (
    <div className="bg-gray-900 min-h-screen p-10">
      <h1 className="pl-20 text-5xl font-semibold text-white text-center p-7">Filmes</h1>
      {erro && <p className="text-red font-semibold">{erro}</p>}

      <div className="border-b-6 border-black last:border-b-0">
        <h2 className="pl-20 text-3xl font-semibold text-white">Populares</h2>
        <div className="pl-30 pr-30">
          {popularmovies.map((movie) => (
            <div className="pb-7 pt-7 border-b border-gray-500 last:border-b-0" key={movie.id}>
              <p className="text-lg font-semibold text-white">ID: {movie.id}</p>
              <p className="text-lg font-semibold text-white">Título: {movie.title}</p>
              <p className="text-lg font-semibold text-white">Data de Lançamento: {movie.release_date}</p>
              <p className="text-lg font-semibold text-white">Descrição: {movie.overview}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-blue-700 last:border-b-0">
        <h2 className="pl-20 pt-5 text-3xl font-semibold text-white">Recentes</h2>
        <div>
          {trailermovies.map((movie) => (
            <ul className="p-5 pl-30 pr-30 border-b border-gray-500 last:border-b-0" key={movie.id}>
              <p className="pr-30 text-lg font-semibold text-white">Título: {movie.title}</p>
              <p className='pr-30 text-lg font-semibold text-white'>Data de Lançamento: {movie.release_date}</p>
              {movie.trailerUrl && movie.trailerUrl !== null && (
                <div className="mt-4">
                  <iframe
                    width="500"
                    height="300"
                    src={movie.trailerUrl}
                    title="Trailer"
                    allowFullScreen
                  />
                </div>
              )}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Script1;
