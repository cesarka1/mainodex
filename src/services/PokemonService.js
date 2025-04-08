const API_URL = "https://pokeapi.co/api/v2/pokemon";
const SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

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

export const getPokemonByNameOrId = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
      types: data.types.map((t) => t.type.name),
    };
  } catch (error) {
    console.error("Pokémon com ID ou nome não encontrado:", error);
    return null;
  }
};

export const getPokemonsBySpecies = async (specie) => {
  try {
    const res = await fetch(`${SPECIES_URL}/${specie}`);
    const data = await res.json();
    const varieties = data.varieties;
    console.log("Variantes", varieties);
    const detailedPokemons = await Promise.all(
      varieties.map(async (variant) => {
        const detailRes = await fetch(variant.pokemon.url);
        const detailData = await detailRes.json();

        return {
          id: detailData.id,
          name: detailData.name,
          image: detailData.sprites.other["official-artwork"].front_default,
          types: detailData.types.map((t) => t.type.name),
        };
      })
    );
    console.log("Pokémons detalhados", detailedPokemons);
    return detailedPokemons;
  } catch (error) {
    console.error("Erro ao buscar pokémons por espécie:", error);
    return [];
  }
};