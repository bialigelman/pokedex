
import {useState} from 'react';
import {BsArrowUpCircle} from 'react-icons/bs'

  
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <button className='scrollTopButton'onClick={scrollToTop}  style={{display: visible ? 'flex' : 'none'}}>
        <BsArrowUpCircle/> <span>Voltar ao topo</span>
    </button>
  );
}
  
export default ScrollButton;