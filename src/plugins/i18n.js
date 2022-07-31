import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// Ready translated locale messages
const messages = {
    fr: {
        game: {
            autocompleteLabel: 'Nom du pokémon...',
            autocompleteErrors: {
                alreadyVerified: "Pokémon déjà vérifié.",
                notFound: "Ce pokémon n'a pas été trouvé."
            },
            properties: {
                sprite: "Sprite",
                id: "Pokedex ID",
                type: {
                    title: "Type",
                    normal: "normal",
                    fighting: "combat",
                    flying: "vol",
                    poison: "poison",
                    ground: "sol",
                    rock: "roche",
                    bug: "insecte",
                    ghost: "spectre",
                    steel: "acier",
                    fire: "feu",
                    water: "eau",
                    grass: "plante",
                    electric: "electrik",
                    psychic: "psy",
                    ice: "glace",
                    dragon: "dragon",
                    dark: "ténèbres",
                    fairy: "fée"
                },
                color: {
                    title: "Couleur",
                    black: "noir",
                    blue: "bleu",
                    brown: "marron",
                    gray: "gris",
                    green: "vert",
                    pink: "rose",
                    purple: "violet",
                    red: "rouge",
                    white: "blanc",
                    yellow: "jaune"
                },
                generation: {
                    title: "Génération",
                    true: "Oui",
                    false: "Non"
                },
                is_evolution: {
                    title: "Forme",
                    true: "Forme évoluée",
                    false: "Forme non-évoluée"
                },
                is_leg_or_myth: {
                    title: "Légendaire ou mythique",
                    true: "Légendaire ou mythique",
                    false: "Non légendaire ou mythique"
                },
            },
            buttonStatsLabel: "Statistiques",
            dialogStats: {
                titleWin: "GG ! 😄",
                titleLose: "Dommage... 😞",
                guessReveal: "Le pokémon à deviner était ",
                buttonCopyLabel: "Copier"
            }
        }
    },
    en: {
        game: {
            autocompleteLabel: 'Pokemon name...',
            autocompleteErrors: {
                alreadyVerified: "Pokemon already verified.",
                notFound: "This pokemon wasn't found."
            },
            properties: {
                sprite: "Sprite",
                id: "Pokedex ID",
                type: {
                    title: "Type",
                    normal: "normal",
                    fighting: "fighting",
                    flying: "flying",
                    poison: "poison",
                    ground: "ground",
                    rock: "rock",
                    bug: "bug",
                    ghost: "ghost",
                    steel: "steel",
                    fire: "fire",
                    water: "water",
                    grass: "grass",
                    electric: "electric",
                    psychic: "psychic",
                    ice: "ice",
                    dragon: "dragon",
                    dark: "dark",
                    fairy: "fairy"
                },
                color: {
                    title: "Color",
                    black: "black",
                    blue: "blue",
                    brown: "brown",
                    gray: "gray",
                    green: "green",
                    pink: "pink",
                    purple: "purple",
                    red: "red",
                    white: "white",
                    yellow: "yellow"
                },
                generation: {
                    title: "Generation",
                    true: "Yes",
                    false: "No"
                },
                is_evolution: {
                    title: "Form",
                    true: "Evolved form",
                    false: "Unevolved form"
                },
                is_leg_or_myth: {
                    title: "Legendary or mythical",
                    true: "Legendary or mythical",
                    false: "Not legendary or mythical"
                },
            },
            buttonStatsLabel: "Statistics",
            dialogStats: {
                titleWin: "GG ! 😄",
                titleLose: "Sadge... 😞",
                guessReveal: "The pokemon to guess was ",
                buttonCopyLabel: "Copy"
            }
        }
    },
    ja: {
        game: {
            autocompleteLabel: 'ポケモン 名...',
            autocompleteErrors: {
                alreadyVerified: "確認したポケモン.",
                notFound: "このポケモン 名　は　見つけなかった."
            },
            properties: {
                sprite: "スプライト",
                id: "ポケでクス　身元",
                type: {
                    title: "タイプ",
                    normal: "ノーマル",
                    fighting: "闘",
                    flying: "ひこう",
                    poison: "毒",
                    ground: "じめん",
                    rock: "いわ",
                    bug: "むし",
                    ghost: "ゴースト",
                    steel: "はがね",
                    fire: "ほのお",
                    water: "ほのお",
                    grass: "くさタ",
                    electric: "でんき",
                    psychic: "エスパー",
                    ice: "氷",
                    dragon: "ドラゴン",
                    dark: "悪",
                    fairy: "フェアリー"
                },
                color: {
                    title: "色",
                    black: "ブラック",
                    blue: "ブルー",
                    brown: "ブラウン",
                    gray: "グレイ",
                    green: "グリーン",
                    pink: "ピンク",
                    purple: "パープル",
                    red: "レッド",
                    white: "ホワイト",
                    yellow: "イエロー"
                },
                generation: {
                    title: "世代",
                    true: "イエス",
                    false: "ノー"
                },
                is_evolution: {
                    title: "形",
                    true: "進化形",
                    false: "進化していない形"
                },
                is_leg_or_myth: {
                    title: "伝説 / 幻",
                    true: "伝説 / 幻",
                    false: "ノン伝説 / ノン幻"
                },
            },
            buttonStatsLabel: "ゲーム統計",
            dialogStats: {
                titleWin: "おめでとう ! 😄",
                titleLose: "とても悲しい... 😞",
                guessReveal: "推測するポケモンは ",
                buttonCopyLabel: "コピペ"
            }
        }
    }
}

export default new VueI18n({
    locale: 'fr', // set locale
    messages, // set locale messages
});