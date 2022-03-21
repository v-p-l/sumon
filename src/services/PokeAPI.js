import API from './API';
import PokemonNames from "@/traductions/pokemons.json";
import PokemonTypes from "@/traductions/types.json";
import PokemonColors from "@/traductions/colors.json";

const url = "https://pokeapi.co/api/v2";

function filterTypes(array) {
	let types = [];
	for (let i = 0; i < array.length; i++) {
		let translatedType = translateType(array[i].type.name);
		types.push(translatedType);
	}
	return types;
}

function translateType(pokemonType) {
	const type = PokemonTypes.find((x) => x.en === pokemonType);
	if (type) {
		return type.fr;
	} else {
		throw "Ce type n'existe pas.";
	}
}

function translateColor(color) {
	const pokemonColor = PokemonColors.find((x) => x.en === color);
	if (pokemonColor) {
		return pokemonColor.fr;
	} else {
		throw "Cette couleur n'existe pas.";
	}
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
		const id = await generateRandomID(381);
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
				const french_name = res.data.names[4].name; // 4 = French
				const color = translateColor(res.data.color.name);
				const generation = transformGen(res.data.generation.name);
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