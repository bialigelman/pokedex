export interface IPokemonState {
    pokemonList: IResponseList['results'];
    setPokemonList: React.Dispatch<React.SetStateAction<IPokemonData[]>>;
    pokemonNames: string[];
    setPokemonNames: React.Dispatch<React.SetStateAction<string[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    pokemonsAttributes: PokemonAttributes[];
    setPokemonsAttributes: React.Dispatch<
        React.SetStateAction<PokemonAttributes[]>
    >;
    sortedNames: boolean;
    setSortedNames: React.Dispatch<React.SetStateAction<boolean>>;
    orderNamesValue: string;
    setOrderNamesValue: React.Dispatch<React.SetStateAction<string>>;
    defaultValue: IPokemons[]
    setDefaultValue: React.Dispatch<React.SetStateAction<IPokemons[]>>
}

export interface IPokemons extends PokemonAttributes{
    name: string,
}


export interface IResponseList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<IPokemonData>;
}

export interface IPokemonData {
    name: string;
    url: string;
}

export interface PokemonAttributes {
    id?: number;
    sprites: PokemonSprites | string;
    stats: Stats | string;
}

export interface PokemonSprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
        dream_world: {
            front_default: string | null;
            front_female: string | null;
        };
        home: {
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
        'official-artwork': {
            front_default: string | null;
            front_shiny: string | null;
        };
    };
}

export interface Stats {
    base_stat: number;
    effort: number;
    stat: Stat;
}

export interface Stat {
    name: string;
    url: string;
}
