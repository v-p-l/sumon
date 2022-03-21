import API from './API';
import PokemonNames from "@/traductions/pokemons.json";

const url = "https://pokeapi.co/api/v2";

function filterTypes(array) {
	let types = [];
	for (let i = 0; i < array.length; i++) {
		types.push(array[i].type.name)
	}
	return types;
}

async function generateRandomID(max) {
	return Math.floor(Math.random() * max) + 1;
}

export default {
	async generateRandomPokemon() {
		const id = await generateRandomID(150);
		const data = await this.getPokemonByID(id);
		return data;
	},
	async getPokemonByID(id) {
		const { types, sprite } = await this.getPokemonDefaultDataByID(id);
		const	{ is_leg_or_myth, french_name, color, generation, is_evolution } = await this.getPokemonSpeciesByID(id);
		return { id, types, sprite, is_leg_or_myth, french_name, color, generation, is_evolution };
	},
	async getPokemonDefaultDataByID(id) {
		return API(url)
			.get('/pokemon/' + id)
			.then((res) => {
				const types = filterTypes(res.data.types);
				const sprite = res.data.sprites.front_default;
				return { types, sprite };
			})
			.catch((err) => {
				console.log(err)
				throw err
			})
	},
	async getPokemonSpeciesByID(id) {
		return API(url)
			.get('/pokemon-species/' + id)
			.then((res) => {
				const is_leg_or_myth = res.data.is_legendary || res.data.is_mythical;
				const french_name = res.data.names[4].name.toLowerCase(); // 4 = French
				const color = res.data.color.name;
				const generation = res.data.generation.name;
				const is_evolution = res.data.evolves_from_species != null;
				return { is_leg_or_myth, french_name, color, generation, is_evolution };
			})
			.catch((err) => {
				console.log(err);
				throw err;
			})
	},
	async pokemonFrenchNameToID(name) {
		const pokemonName = PokemonNames.find(x => x.fr === name);
		if (pokemonName) {
			return pokemonName.id;
		} else {
			throw "Ce pokémon n'existe pas.";
		}
	}
}