import { useEffect, useState } from "react";
import "../index.css"
import { fetchNowPlayingMovies, fetchVoteCount } from "../requestContent";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Script3() {
    const [nowplayingmovies, setNowPlayingMovies] = useState<any[]>([]);
    const [votecount, setVoteCount] = useState<number>();
    const [erro, setErro] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [nowPlayingMovies] = await Promise.all([fetchNowPlayingMovies()]);

                // Guarda os filmes em now playing
                setNowPlayingMovies(nowPlayingMovies);

                // Filme escolhido para retornar a contagem de votos
                const voteCount = await fetchVoteCount(nowPlayingMovies[0].id);
                setVoteCount(voteCount);

            } catch (error) {
                console.error(error);
                setErro("Erro ao buscar filmes.");
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="bg-gray-900">
            <h1 className="pl-20 text-5xl font-semibold text-white text-center p-7">Filmes</h1>
            {erro && <p className="text-red font-semibold">{erro}</p>}

            <div className="absolute top-30 right-30 text-center">
                <p className="text-white text-lg font-semibold">Desafio Extra:</p>
                <button
                    onClick={() => navigate("/busca")}
                    className="p-3 text-white bg-blue-700 rounded-full"
                >
                    <Search className="w-8 h-8" />
                </button>
            </div>

            <div className="border-b-6 border-black last:border-b-0">
                <h2 className="pl-20 text-3xl font-semibold text-white">Em Alta</h2>
                <div className="pl-30 pr-30">
                    {nowplayingmovies.map((movie) => (
                        <div className="pb-7 pt-7 border-b border-gray-500 last:border-b-0" key={movie.id}>
                            <p className="text-lg font-semibold text-white">ID: {movie.id}</p>
                            <p className="text-lg font-semibold text-white">Título: {movie.title}</p>
                            <p className="text-lg font-semibold text-white">Data de Lançamento: {movie.release_date}</p>
                            <p className="text-lg font-semibold text-white">Média de Votos: {movie.vote_average}</p>
                            <p className="text-lg font-semibold text-white">Descrição: {movie.overview}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="pl-20 pt-7 pb-5 text-3xl font-semibold text-white">Filme escolhido para retornar apenas a Contagem de Votos</h2>
                <p className="pl-30 pr-30 pb-7 text-xl font-semibold text-white">Contagem de Votos: {votecount}</p>
            </div>

        </div>
    );
}

export default Script3;
