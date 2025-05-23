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
    if (res.status !== 200) {
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
    if (res.status !== 200) {
      console.error("Resposta inválida da API.");
      return [];
    }

    // getTime retorna os milissegundos da data em relação ao passado. Por isso, é possível pegar os mais recentes.
    const recentMovies = res.data.results.sort((a: any, b: any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

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

          // Verifica se a resposta da API retornou status 200
          if (res.status !== 200) {
            console.error("Resposta inválida da API.");
            return [];
          }

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
    console.error("Erro ao buscar trailers dos filmes.", error);
    return [];
  }
};

// Definindo o valor retornado como sempre sendo <Record<string, any[]>>
export const fetchGenreMovies = async (): Promise<Record<string, any[]>> => {
  try {
    // Requisita da API uma lista com todos os gêneros
    const res = await api.get("3/genre/movie/list", options);

    // Verifica se a resposta da API retornou status 200
    if (res.status !== 200) {
      console.error("Resposta inválida da API.");
      return {};
    }

    // Para cada gênero da lista, filtra-se os que começam com a letra "A"
    const genresA = res.data.genres.filter(
      // "?" utilizado depois do genre.name[0] para garantir que, caso um gênero não possua nome, ele não será lido
      (genre: any) => genre.name[0]?.toLowerCase() === "a"
    );

    // Extraindo os Ids dos gêneros com a letra "A" para mostrar que consegui da forma pedida no desafio
    // Porém, não usarei o genresIds, pois preciso do nome do gênero para a implementação completa
    const genresIds = genresA.map((genre: any) => genre.id);
    console.log(genresIds);

    // Declarado dessa forma para que fosse possível manter o nome do gênero (string) junto aos arrays de filmes buscados (any)
    const moviesbyGenre: Record<string, any[]> = {};

    await Promise.all(
      genresA.map(async (genre: any) => {
        // Busca na API os filmes de acordo com os gêneros listados
        const res = await api.get(`3/discover/movie?language=pt-br&with_genres=${genre.id}`, options);

        // Verifica se a resposta da API retornou status 200
        if (res.status !== 200) {
          console.error("Resposta inválida da API.");
          return {};
        }

        moviesbyGenre[genre.name] = res.data.results;
      })
    );

    return moviesbyGenre;
  } catch (error) {
    console.error("Erro ao buscar filmes.", error);
    return {};
  }
};

export const fetchNowPlayingMovies = async () => {
  try {
    // Requisita da API os filmes "Now Playing"
    const res = await api.get("3/movie/now_playing?language=pt-BR", options);

    // Verifica se a resposta da API retornou status 200
    if (res.status !== 200) {
      console.error("Resposta inválida da API.");
      return [];
    }

    // Formata as datas de cada filme
    const formatedNowPlayingMovies = res.data.results.map((filme: any) => ({
      ...filme,
      release_date: formatDate(filme.release_date),
    }));

    return formatedNowPlayingMovies;
  } catch (error) {
    console.error("Erro ao buscar filmes.", error);
    return [];
  }
};

export const fetchVoteCount = async (movieId: number) => {
  try {
    // Requisita da API o filme do Id passado como parâmetro
    const res = await api.get(`3/movie/${movieId}?language=pt-BR`, options);

    // Verifica se a resposta da API retornou status 200
    if (res.status !== 200) {
      console.error("Resposta inválida da API.");
      return [];
    }

    // Pega a contagem de votos do filme
    const voteCount = res.data.vote_count;

    return voteCount;
  } catch (error) {
    console.error("Erro ao buscar filmes.", error);
    return [];
  }
};

export const searchContents = async (searchMedia: string): Promise<any[]> => {
  try {
    // Requisita da API os filmes baseados na busca
    const res = await api.get(`3/search/movie?query=${searchMedia}&language=pt-BR`, options);

    // Verifica se a resposta da API retornou status 200
    if (res.status !== 200) {
      console.error("Resposta inválida da API.");
      return [];
    }

    // Apenas para ordenar os conteúdos que aparecerão na pesquisa por quantidade de votos totais
    // Isso evita que conteúdos de nome igual, mas sem relevância, apareçam antes dos relevantes
    const search = res.data.results.sort((a: any, b: any) => b.vote_count - a.vote_count);

    console.log(search);
    return search;
  } catch (error) {
    console.error('Erro ao buscar filmes.', error);
    return [];
  }
};