import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		dark: false,
		themes: {
			light: {
        primary: '#FFCB05',
        secondary: '#3564AD',
        accent: colors.shades.black,
        error: colors.red.accent3,
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107',
				background: '#F4F5FA'
			},
			dark: {
        primary: '#FFCB05',
        secondary: '#3564AD',
        accent: colors.shades.black,
        error: colors.red.accent3,
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107',
				background: '#28243D'
			},
		},
		icons: {
			iconfont: 'mdi'
		},
		options: {
			customProperties: true,
		},
	},
});
