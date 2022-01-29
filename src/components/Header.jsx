import React, { useEffect, useRef } from "react"
import { HeaderNav, Logo, Menu } from "../styles/HeaderStyles"
import { Container, Flex } from "../styles/GlobalStyles"
import { Link } from "gatsby"
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/GlobalContext"
import useElementPosition from "../hooks/UseElementPosition"

const Header = ({
  onCursor,
  toggleMenu,
  setToggleMenu,
  setHamburgerPosition,
  hamburgerPosition
}) => {
  const hamburgerRef = useRef(null)
  const { currentTheme } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const position = useElementPosition(hamburgerRef)

  const toggleTheme = () => {
    if (currentTheme === "dark") {
      dispatch({ type: "TOGGLE_THEME", theme: "light" })
    } else {
      dispatch({ type: "TOGGLE_THEME", theme: "dark" })
    }
  }

  const menuOver = () => {
    onCursor('locked')
    setHamburgerPosition({ x: position.x, y: position.y = 72 })
  }

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme)
  }, [currentTheme])
  return (
    <HeaderNav
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -72, opacity: 0 }}
      transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <Container>
        {console.log(currentTheme)}
        <Flex spaceBetween noHeight>
          <Logo
            onMouseEnter={() => onCursor("hovered")}
            onMouseLeave={onCursor}
          >
            <Link to="/">FURRO</Link>
            <span onClick={toggleTheme}></span>
            <Link to="/">W</Link>
          </Logo>
          <Menu
            onClick={() => setToggleMenu(!toggleMenu)}
            onMouseEnter={menuOver}
            onMouseLeave={onCursor}
            ref={hamburgerRef}
          >
            <button>
              <span></span>
              <span></span>
            </button>
          </Menu>
        </Flex>
      </Container>
    </HeaderNav>
  )
}

export default Header
