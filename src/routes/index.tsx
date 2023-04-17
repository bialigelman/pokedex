import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonProvider from "../providers/PokedexProvider";
import Pokedex from "../pages/Pokedex";

function PokedexRoutes() {

    return (
        <Router>
            <PokemonProvider>
                <Routes>
                    <Route path={"/"} element={<Pokedex />} />
                </Routes>
            </PokemonProvider>
        </Router>
    )
}
export default PokedexRoutes