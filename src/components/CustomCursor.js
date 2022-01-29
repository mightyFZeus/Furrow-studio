import React, {useState, useEffect} from 'react';
import { Cursor } from '../styles/GlobalStyles'
import { useGlobalStateContext } from '../context/GlobalContext';

const CustomCursor = ({ toggleMenu }) => {
  const { cursorType } = useGlobalStateContext()
  const [mousePosition, setMousePosition] = useState({
    x: 400,
    y: 400,
  })

  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event
    setMousePosition({ x, y })
  }

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [])
  return (
    <>
      <Cursor
        className={`${
          !!cursorType ? "hovered" : ""
        } ${cursorType} ${toggleMenu? 'nav-open' : ""}`}
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
    </>
  )
}

export default CustomCursor;
