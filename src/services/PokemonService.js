const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemons = async (limit = 9, offset = 0) => {
  try {
    const res = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);
    const data = await res.json();
    const results = data.results;

    const detailedPokemons = await Promise.all(
      results.map(async (pokemon) => {
        const detailRes = await fetch(pokemon.url);
        const detailData = await detailRes.json();

        return {
          id: detailData.id,
          name: detailData.name,
          image: detailData.sprites.other["official-artwork"].front_default,
          types: detailData.types.map((t) => t.type.name),
        };
      })
    );

    return detailedPokemons;
  } catch (error) {
    console.error("Erro ao buscar pokémons:", error);
    return [];
  }
};
