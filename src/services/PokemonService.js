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
        return returnData(detailData);
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
    return returnData(data);
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
    const detailedPokemons = await Promise.all(
      varieties.map(async (variant) => {
        const detailRes = await fetch(variant.pokemon.url);
        const detailData = await detailRes.json();

        return returnData(detailData);
      })
    );
    return detailedPokemons;
  } catch (error) {
    console.error("Erro ao buscar pokémons por espécie:", error);
    return [];
  }
};

const returnData = (data) => {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    types: data.types.map((t) => t.type.name),
    sprites: data.sprites,
    moves: data.moves,
    // game_indices: data.game_indices,
  };
};

export async function getPokemonWithEvolutions(nameOrId) {
  const pokemonRes = await fetch(`${API_URL}/${nameOrId}`);
  const pokemonData = await pokemonRes.json();

  const speciesRes = await fetch(pokemonData.species.url);
  const speciesData = await speciesRes.json();
  const evolutionRes = await fetch(speciesData.evolution_chain.url);
  const evolutionData = await evolutionRes.json();
  const evolutionChain = await buildEvolutionChain(evolutionData.chain);
  return {
    ...pokemonData,
    evolution_chain: evolutionChain,
  };
}

async function buildEvolutionChain(chainNode) {
  const chain = [];

  async function traverse(node) {
    const pokemonName = node.species.name;
    const details = node.evolution_details?.[0] || null;

    const pokeRes = await fetch(`${API_URL}/${pokemonName}`);
    const pokeData = await pokeRes.json();

    chain.push({
      species_name: pokemonName,
      image: pokeData.sprites.front_default,
      evolves_to: node.evolves_to,
      trigger: details?.trigger?.name || null,
      min_level: details?.min_level || null,
      item: details?.item?.name || null,
    });

    if (node.evolves_to.length > 0) {
      await traverse(node.evolves_to[0]);
    }
  }

  await traverse(chainNode);
  return chain;
}
