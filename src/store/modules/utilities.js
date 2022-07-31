import i18n from "@/plugins/i18n";

const getDefaultState = () => {
	return {
		showNavBar: false,
		darkMode: false,
		lang: "fr"
	}
}

const utilities = {
	namespaced: true,
	state: getDefaultState(),
	getters: {
		showNavBar(state) {
			return state.showNavBar;
		},
		darkMode(state) {
			return state.darkMode;
		},
		lang(state) {
			return state.lang;
		}
	},
	mutations: {
		resetState(state) {
			Object.assign(state, getDefaultState());
		},
		updateNavBar(state) {
			state.showNavBar = !state.showNavBar;
		},
		updateDarkMode(state) {
			state.darkMode = !state.darkMode;
		},
		onLangChanged(state, lang) {
			state.lang = lang;
		}
	},
	actions: {
		changeLanguage({ commit }, lang) {
			commit('onLangChanged', lang);
			i18n.locale = lang;
		},
		resetGlobalState(context) {
			context.commit('auth/resetState', null, { root: true })
			context.commit('dialogs/resetState', null, { root: true })
		}
	}
}

export default utilities