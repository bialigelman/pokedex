import React, { createContext, useState } from 'react';
import { IPokemonState, IPokemons, IResponseList, PokemonAttributes } from '../types/pokemon';


export const PokedexContext = createContext<IPokemonState>({
    pokemonList: [{ name: '', url: '' }],
    setPokemonList: () => { },
    pokemonNames: [''],
    setPokemonNames: () => { },
    loading: true,
    setLoading: () => { },
    pokemonsAttributes: [{ id: 0, sprites: '', stats: '' }],
    setPokemonsAttributes: () => { },
    sortedNames: false,
    setSortedNames: () => { },
    orderNamesValue: '',
    setOrderNamesValue: () => {},
    defaultValue:[{name: '', sprites: '', stats: ''}], 
    setDefaultValue: () => {}
});

PokedexContext.displayName = 'Pokemon';

interface Props {
    children: React.ReactNode;
}

const PokemonProvider: React.FC<Props> = ({ children }) => {

    const [pokemonList, setPokemonList] = useState<IResponseList["results"]>([{ name: '', url: '' }])
    const [pokemonNames, setPokemonNames] = useState<string[]>([''])
    const [loading, setLoading] = useState<boolean>(true)
    const [pokemonsAttributes,  setPokemonsAttributes] = useState<PokemonAttributes[]>([{id: 0, sprites: '', stats: ''}])
    const [sortedNames, setSortedNames] = useState(false)
    const [orderNamesValue, setOrderNamesValue] = useState<string>('')
    const [defaultValue, setDefaultValue] = useState<IPokemons[]>([{name: '', sprites: '', stats: ''}])

    return (
        <PokedexContext.Provider
            value={{
                pokemonList,
                setPokemonList,
                pokemonNames,
                setPokemonNames,
                loading,
                setLoading,
                pokemonsAttributes,
                setPokemonsAttributes,
                sortedNames, 
                setSortedNames,
                orderNamesValue,
                setOrderNamesValue,
                defaultValue, 
                setDefaultValue
            }}
        >
            {children}
        </PokedexContext.Provider>
    );
};

export default PokemonProvider;
