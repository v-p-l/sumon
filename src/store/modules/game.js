import db from "@/main.js";
import { doc, getDoc } from "firebase/firestore";

const getDefaultState = () => {
    return {
        challengeOfTheDay: {
            id: null,
            pokemonID: null,
            answers: [],
            lastUpdate: "",
        }
    }
}

const game = {
    namespaced: true,
    state: getDefaultState(),
    getters: {
        challengeOfTheDayID (state) {
            return state.challengeOfTheDay.id;
        },
        challengeOfTheDayPokemonID (state) {
            return state.challengeOfTheDay.pokemonID;
        },
        challengeOfTheDayAnswers (state) {
            return state.challengeOfTheDay.answers;
        },
        challengeOfTheDayEnded (state, getters) {
            return state.challengeOfTheDay.answers.length >= 6 || getters.challengeOfTheDayGuessed; 
        },
        challengeOfTheDayGuessed (state) {
            return state.challengeOfTheDay.answers.some((x) => x.id === state.challengeOfTheDay.pokemonID);
        },
        lastUpdate (state) {
            return state.challengeOfTheDay.lastUpdate;
        },
    },
    mutations: {
        updateChallengeOfTheDay (state, payload) {
            state.challengeOfTheDay.id = payload.id;
            state.challengeOfTheDay.pokemonID = payload.pokemonID;
            state.challengeOfTheDay.lastUpdate = payload.timeNow;
            state.challengeOfTheDay.answers = [];
        },
        addChallengeOfTheDayAnswer (state, payload) {
            state.challengeOfTheDay.answers.push(payload);
        },
        resetState(state) {
            Object.assign(state, getDefaultState());
        },
    },
    actions: {
        async getChallengeOfTheDay ({ commit }, timeNow) {
            const docRef = doc(db, "sumon", "challengeOfTheDay");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const { id, pokemonID } = docSnap.data();
                commit('updateChallengeOfTheDay', { id, pokemonID, timeNow });
                return pokemonID;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
    }
}

export default game