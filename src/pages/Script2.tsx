import { useEffect, useState } from "react";
import "../index.css"
import { fetchGenreMovies } from "../requestContent";

function Script2() {
    const [genremovies, setGenreMovies] = useState<Record<string, any[]>>({});
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [genreMovies] = await Promise.all([
                    fetchGenreMovies(),
                ]);

                // Guarda os filmes por gênero buscado
                setGenreMovies(genreMovies);

            } catch (error) {
                console.error(error);
                setErro("Erro ao buscar filmes.");
            }
        };

        fetchMovies();
    }, []);


    return (
        <div className="bg-gray-900 min-h-screen p-10">
            <h1 className="text-5xl font-semibold text-white text-center p-7">Filmes por Gênero com Letra 'A'</h1>
            {erro && <p className="text-red-500 font-semibold">{erro}</p>}

            {/*Object.entries foi chamada para transformar o objeto genremovies em um array de [chave, valor]*/}
            {Object.entries(genremovies).map(([genreName, movies]) => (
                <div key={genreName} className="pb-10">
                    <h2 className="text-3xl font-semibold text-white mb-5">{genreName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {movies.map((movie: any) => (
                            <div key={movie.id} className="bg-gray-800 p-3 text-center rounded">
                                <p className="text-white text-lg font-bold">{movie.id}</p>
                                <p className="text-white text-lg font-bold">{movie.title}</p>
                                {movie.poster_path && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt="Poster do filme"
                                        className="h-60 w-44 rounded pt-2 mx-auto"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

}

export default Script2;
