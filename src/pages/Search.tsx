import { useState } from "react";
import { searchContents } from "../requestContent";

function Search() {
    const [searchMedia, setMediaSearch] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {
        // Verifica se a busca não está vazia
        if (!searchMedia.trim()) {
            return [];
        }
        // Envia o que foi digitado na busca como parâmetro para a função searchContents
        const movies = await searchContents(searchMedia);
        setResults(movies);
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-center gap-5 pb-6">
                <input
                    type="text"
                    className="p-2 rounded text-white w-200 border rounded"
                    placeholder="Buscar Filme"
                    value={searchMedia}
                    onChange={(e) => setMediaSearch(e.target.value)}
                />
                <button onClick={handleSearch} className="bg-blue-700 px-4 py-2 rounded text-white">Buscar</button>
            </div>

            <div>
                {results.length === 0 && <p className="pl-15 p-5">Nenhum resultado encontrado.</p>}
                {results.map((movie) => (
                    <div key={movie.id} className="border-b border-gray-500 p-4">
                        <p className="text-xl font-semibold">{movie.title}</p>
                        <p className="text-lg fonte-semibold">Votos: {movie.vote_count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
