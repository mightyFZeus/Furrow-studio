import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from "styled-normalize";
import Header from "./Header";
import { useGlobalStateContext, useGlobalDispatchContext } from "../context/GlobalContext";
import CustomCursor from "./CustomCursor";
import Navigation from "./Navigation";
import Footer from "./Footer";


const GlobalStyle = createGlobalStyle`
${normalize}
* {
  text-decoration: none;
  cursor: none;
}
html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  
  
}
body {
  font-size: 16px;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: ${props => props.theme.background};
  overscroll-behavior: none;
  overflow-x: hidden;
}
`



const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [hamburgerPosition, setHamburgerPosition] = useState({
    x:0, y:0
  })

  const darkTheme = {
    background: "#000",
    text: "#fff",
    red:"#ea291e",
    left:`${ hamburgerPosition.x}px`,
    top:`${ hamburgerPosition.y}px`,
  }

  const lightTheme = {
    background: "#fff",
    text: "#000",
    red:"#ea291e",
    left:`${ hamburgerPosition.x}px`,
    top:`${ hamburgerPosition.y}px`,
  }

  
const dispatch = useGlobalDispatchContext()
  const { currentTheme, cursorStyles } = useGlobalStateContext()
  

  
const onCursor = cursorType => {
  cursorType = (cursorStyles.includes(cursorType) && cursorType || false)
  dispatch({type: "CURSOR_TYPE", cursorType:cursorType})
  }
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <CustomCursor toggleMenu={toggleMenu} />
      <Header
        onCursor={onCursor}
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        hamburgerPosition={hamburgerPosition}
        setHamburgerPosition={setHamburgerPosition}
      />
      <Navigation
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        onCursor={onCursor}
      />

      <main>{children}</main>
      <Footer onCursor={onCursor} setHamburgerPosition={setHamburgerPosition} />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
