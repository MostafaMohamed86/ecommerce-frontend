import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';



type HeaderCounterProps = {
  totalQuantity: number;
  svgIcon: React.ReactNode;
  to: string;
  title: string;
}
const {container, totalNum, pumpAnimate, iconWrapper } = styles;
const HeaderCounter = ({totalQuantity, svgIcon, to, title}: HeaderCounterProps) => { 
  const [isAnimated, setIsAnimated] = useState(false);
  const quantityStyle = `${totalNum} ${isAnimated ? pumpAnimate : ''} `;
  const navigate = useNavigate();
  useEffect(() => {
    if(totalQuantity>0)
    setIsAnimated(true);
    const debounce = setTimeout(()=>{
      setIsAnimated(false);
    },300);
    return () => clearTimeout(debounce);
  }, [totalQuantity])
  
  return (
    <div className={container} onClick={()=>{navigate(to)}}>
    <div className={iconWrapper}>
    {svgIcon}
      {totalQuantity > 0 && <div className={quantityStyle}>{totalQuantity}</div>}
    </div>
    <h3>{title}</h3>
    </div>
  );
}

export default HeaderCounter
