import API from './API';
import PokemonNames from "@/traductions/pokemons.json";

const url = "https://pokeapi.co/api/v2";

function filterTypes(array) {
	let types = [];
	for (let i = 0; i < array.length; i++) {
		types.push(array[i].type.name);
	}
	return types;
}

function transformGen(gen) {
	switch (gen) {
		case "generation-i":
			return "1";
		case "generation-ii":
			return "2";
		case "generation-iii":
			return "3";
		case "generation-iv":
			return "4";
		case "generation-v":
			return "5";
		case "generation-vi":
			return "6";
		case "generation-vii":
			return "7";
		case "generation-viii":
			return "8";
	}
}

async function generateRandomID(max) {
	return Math.floor(Math.random() * max) + 1;
}

export default {
	async generateRandomPokemon() {
		const id = await generateRandomID(151);
		const data = await this.getPokemonByID(id);
		return data;
	},
	async getPokemonByID(id) {
		const { types, sprite } = await this.getPokemonDefaultDataByID(id);
		const	{ is_leg_or_myth, color, generation, is_evolution } = await this.getPokemonSpeciesByID(id);
		return { id, types, color, generation, is_evolution, is_leg_or_myth, sprite };
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
				const color = res.data.color.name;
				const generation = transformGen(res.data.generation.name);
				const is_evolution = res.data.evolves_from_species != null;
				return { is_leg_or_myth, color, generation, is_evolution };
			})
			.catch((err) => {
				console.log(err);
				throw err;
			})
	},
	async pokemonNameToID(name, lang) {
		const pokemon = PokemonNames.find(x => x[lang] === name);
		if (pokemon) {
			return pokemon.id;
		}
	},
	pokemonIDToName(id, lang) {
		const pokemon = PokemonNames.find(x => x.id === id);
		if (pokemon) {
			return pokemon[lang];
		} else {
			return "";
		}
	}
}