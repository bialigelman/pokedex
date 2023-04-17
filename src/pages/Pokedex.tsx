import { usePokemonList } from '../hooks/usePokemonList';
import  spinner  from "../assets/spinner.png"
import { useEffect, useState } from 'react';
import {FiFilter} from "react-icons/fi"
import ScrollButton from '../components/BackToTopButton';
function Pokedex() {


  const { loading, orderNamesValue, sortedNames, setSortedNames, setOrderNamesValue, pokemonElements } = usePokemonList()
  const[checked, setChecked] = useState<boolean>(false)
  const [checkAsc, setCheckAsc] = useState<boolean>(false)
  const [checkDesc, setCheckDesc] = useState<boolean>(false)

  useEffect(() => {
    if(orderNamesValue === '' && !sortedNames){
      setChecked(false)
      setCheckAsc(false)
      setCheckDesc(false)
    }

    if(orderNamesValue === '' && sortedNames){
      setChecked(true)
      setCheckAsc(false)
      setCheckDesc(false)
    }
    
    if ((orderNamesValue === 'asc' ) || (orderNamesValue === 'desc')) {
      setSortedNames(true)
    }
    if(orderNamesValue === 'asc' ){
      setChecked(false)
      setCheckDesc(false)
      setCheckAsc(true)
    }

    if(orderNamesValue === 'desc' ){
      setChecked(false)
      setCheckAsc(false)
      setCheckDesc(true)
    }
 
  }, [orderNamesValue, setSortedNames, setCheckAsc, setCheckDesc, setChecked, sortedNames])

  return (
    loading ? <section className='pokemon__loading'><img className="loading" src={spinner} alt="Carregando" /></section>
      : <>
        <section className='pokemon__section'>
          <form className='pokemon__section__form'>
            <FiFilter/>
            <label htmlFor="pokemon__section__form__asc" className='pokemon__section__form__label' >A - Z</label>
            <input id='pokemon__section__form__asc' checked={checkAsc} className='pokemon__section__form__input' value='asc' type="checkbox" onChange={(e) => setOrderNamesValue(e.currentTarget.value)} onClick={() => setSortedNames(true)}/>
            <label htmlFor="pokemon__section__form__desc" className='pokemon__section__form__label'>Z - A</label>
            <input id='pokemon__section__form__desc' checked={checkDesc} className='pokemon__section__form__input' value='desc' type="checkbox" onChange={(e) => setOrderNamesValue(e.currentTarget.value)}onClick={() => setSortedNames(true)} />
            <label htmlFor="pokemon__section__form__limpar" className='pokemon__section__form__label'>Limpar Filtros</label>
            <input id='pokemon__section__form__limpar' checked={checked} className='pokemon__section__form__input' value='' type="checkbox" onChange={(e) => setOrderNamesValue(e.currentTarget.value)} onClick={() => setSortedNames(true)}/>
          </form>

          <div className='pokemon__section__pokemonElements'>{pokemonElements}</div>
          <ScrollButton/>
        </section>
      
      </>
  )

}
export default Pokedex;