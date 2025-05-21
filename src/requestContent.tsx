import { api, options } from "./api";

// Função para formatar a data de YYYY//MM//DD para DD/MM/AAAA
function formatDate(dataString: string) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(dataString));
}

export const fetchPopularMovies = async () => {
  try {
    // Requisita da API os filmes populares
    const res = await api.get("3/movie/popular?language=pt-BR", options);

    // Verifica se a resposta da API retornou status 200
    if (res.status !== 200 || !res.data?.results) {
      console.error("Resposta inválida da API.");
      return []; 
    }

    // Formata as datas de cada filme
    const formatedMovies = res.data.results.map((filme: any) => ({
          ...filme,
          release_date: formatDate(filme.release_date),
        }));
    
    return formatedMovies;
  } catch (error) {
    console.error("Erro ao buscar filmes.", error);
    return []; 
  }
};

export const fetchRecentMovies = async () => {
  try {
    // Requisita da API os filmes recentes
    const res = await api.get("3/movie/popular?language=pt-br", options);

    // Verifica se a resposta da API retornou status 200
    if (res.status !== 200 || !res.data?.results) {
      console.error("Resposta inválida da API.");
      return []; 
    }

    // getTime retorna os milissegundos da data em relação ao passado. Por isso, é possível pegar os mais recentes.
    const recentMovies = res.data.results.sort((a:any, b:any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    
    const top5recent = recentMovies.slice(0, 5);

    // Formata as datas de cada filme
    const formatedMovies = top5recent.map((movie: any) => ({
        ...movie,
        release_date: formatDate(movie.release_date),
    }));

    
    const trailers = await Promise.all(
      formatedMovies.map(async (movie: any) => {
        try {
          // Para cada filme dos 5 mais recentes, busca o trailer pelo id
          const fetchTrailers = await api.get(`3/movie/${movie.id}/videos`, options);

          // Para cada trailer encontrado, verifica se tem no Youtube
          const trailer = fetchTrailers.data.results.find(
            (video: any) => video.type === "Trailer" && video.site === "YouTube"
          );

          return {
            ...movie,
            // Salva chave do trailer se houver no Youtube
            trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
          };
        } catch (trailerError) {
          console.warn(`Erro ao buscar trailer para o filme ${movie.id}.`);
          return {
            ...movie,
            trailerUrl: null,
          };
        }
      })
    );

    return trailers;
  } catch (error) {
    console.error("Erro ao buscar filmes.", error);
    return []; 
  }
};