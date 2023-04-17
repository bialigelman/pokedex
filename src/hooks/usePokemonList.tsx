import { useContext, useEffect, useCallback, useMemo } from 'react';
import { PokedexContext } from '../providers/PokedexProvider';
import { IPokemonData, IPokemons, IResponseList, PokemonAttributes } from '../types/pokemon';
import { v4 as uuidv4 } from 'uuid';
import Image from '../components/Image';

export const usePokemonList = () => {
    const LIST_ENDPOINT = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";

    const {
        pokemonList,
        setPokemonList,
        pokemonNames,
        setPokemonNames,
        setLoading,
        pokemonsAttributes,
        setPokemonsAttributes,
        setSortedNames,
        loading,
        orderNamesValue,
        setOrderNamesValue,
        defaultValue,
        setDefaultValue,
        sortedNames,
    } = useContext(PokedexContext);

    /********************************** FUNCTION TO GET ALL POKEMONS FROM ENDPOINT ********************************************/


    const fetchPokemons = useCallback(async () => {

        const data: IResponseList = await (await fetch(LIST_ENDPOINT)).json();
        if (!data) {
            return
        }
        if (!data.results) {
            return
        }
        setPokemonList(data.results)

    }, [setPokemonList]);

    /********************************** EXECUTION ********************************************/

    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons]);

    /********************************** END ********************************************/


    /************************************SET THE LIST OF NAMES OF POKEMONS ***********************************/
    useEffect(() => {

        if (pokemonList.length === 1) {
            return;
        }
        const names: string[] = pokemonList.filter(
            (pokemon: IPokemonData) => pokemon.name !== "")
            .map((item: IPokemonData) => item.name)

        setPokemonNames(names)

    }, [pokemonList, setPokemonNames]);

    /************************************ END ***********************************/

    /***********************************FUNCTION TO FIND THE POKEMONS ATTRIBUTES ****************************************/

    const fetchPokemonsInformations = useCallback(async () => {

        const pokemonDataPromises = pokemonNames
            .map(async (pokemonName: string) => {

                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
                );
                if (!response.ok) {
                    throw new Error('Unable to get response');
                }
                const data = await response.json();
                if (!data) {
                    throw new Error('Unable to fetch data');
                }
                return data;
            });

        const pokemonsData = await Promise.all(pokemonDataPromises);

        const mappedPokemons = pokemonsData.map((pokemon: PokemonAttributes) => {

            return {
                id: pokemon.id ? pokemon.id : 0,
                stats: pokemon.stats ? pokemon.stats : '',
                sprites: pokemon.sprites ? pokemon.sprites : ''
            };
        })

        const filteredPokemons = mappedPokemons.filter((element: PokemonAttributes) => element.id !== 0)

        setPokemonsAttributes((prevAtt = []) => [...prevAtt, ...filteredPokemons]);

    }, [pokemonNames, setPokemonsAttributes]);

    /*********************************** EXECUTION ****************************************/
    useEffect(() => {
        fetchPokemonsInformations();
    }, [fetchPokemonsInformations]);

    /**************************************END********************************************/

    /*************************************** SET FINAL VALUES ****************************************/

    const setFinalValues = useCallback(async () => {
        const value: IPokemons[] = []

     
        for (let i = 0; i < pokemonNames.length; i++) {
            if(!pokemonsAttributes[i + 1]){
                return
            }

            value.push({
                name: pokemonNames[i],
                sprites: pokemonsAttributes[i + 1].sprites,
                stats: pokemonsAttributes[i + 1].stats
            })
        }
        setDefaultValue(value)
        setLoading(false)
    }, [pokemonNames, pokemonsAttributes, setDefaultValue, setLoading])

    /***************************************** EXECUTION *********************************************/
    useEffect(() => {
        setFinalValues();
    }, [setFinalValues]);

  
    /******************************   LIST OR SORT POKEMONS BY NAME  *****************************************/


    const pokemonElements = useMemo(() => {
        const sortedData = orderNamesValue ? [...defaultValue].sort((a, b) => {
            if (orderNamesValue === 'asc') {
                return a.name.localeCompare(b.name);
            } else if (orderNamesValue === 'desc') {
                return b.name.localeCompare(a.name);
            } else {
                return 0;
            }
        }) : defaultValue;

        return sortedData.map((data) => {

            const { name, sprites, stats } = data;
            
            return (
                <article key={uuidv4()} className='pokemon__article'>
                    <h2 className='pokemon__article__name'>{name}</h2>
                    {typeof sprites !== 'string' && sprites?.front_default && (
                        <Image className='pokemon__article__img' src={sprites?.front_default} alt={name} key={uuidv4()} width={150} height={150} />
                    )}
                    {Array.isArray(stats) && (
                            <>
                            <p key={uuidv4()} className='pokemon__article__stat'><span className='pokemon__article__stat__span1'>HP</span> <span className='pokemon__article__stat__span2'>{stats.find((stat) => stat.stat.name === 'hp')?.base_stat}</span></p>
                            <p key={uuidv4()} className='pokemon__article__stat'><span className='pokemon__article__stat__span1'>Attack</span><span className='pokemon__article__stat__span2'>{stats.find((stat) => stat.stat.name === 'attack')?.base_stat}</span></p>
                            <p key={uuidv4()} className='pokemon__article__stat'><span className='pokemon__article__stat__span1'>Defense</span> <span className='pokemon__article__stat__span2'>{stats.find((stat) => stat.stat.name === 'defense')?.base_stat}</span></p>
                            </>
                    )}
                </article>

            );
        });
    }, [defaultValue, orderNamesValue]);

    return {
        loading,
        orderNamesValue,
        setOrderNamesValue,
        pokemonElements,
        setSortedNames,
        sortedNames,

    }
}
