import Image from "./Image"
import  spinner  from "../assets/spinner.png"
function Loading() {
    return <section className='pokemon__loading'><Image className="loading" src={spinner} alt="Carregando" width="" height="" /></section>
}

export default Loading;