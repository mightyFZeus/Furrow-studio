import React from "react"

import HomeAbout from "../components/Homepage/HomeAbout"
import HomeBanner from "../components/Homepage/HomeBanner"
import HomeContent from "../components/Homepage/Homecontent"
import HomeFeatured from "../components/Homepage/HomeFeatured"
import Layout from "../components/layout"
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from "../context/GlobalContext"



const IndexPage = props => {

  const {  cursorStyles } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
  }
  return (
    <Layout>
      <HomeBanner onCursor={onCursor} />
      <HomeContent />
      <HomeFeatured onCursor={onCursor} />
      <HomeAbout onCursor={onCursor} />
    
    </Layout>
  )
}

export default IndexPage
