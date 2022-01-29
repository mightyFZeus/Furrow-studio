import React, {useEffect, useRef} from "react"
import {
  Banner,
  Video,
  Canvas,
  BannerTitle,
  Headline,
} from "../../styles/HomeStyles"

//  custom hook
import useWindowSize from "../../hooks/useWindowSize"
import { useGlobalStateContext } from "../../context/GlobalContext"

const HomeBanner = ({onCursor}) => {
    let canvas = useRef(null)

    const size = useWindowSize()
    const {currentTheme} = useGlobalStateContext()

    useEffect(() => {
      let renderingElement = canvas.current
      // create an offscreen canvas only for the drawings
      let drawingElement = renderingElement.cloneNode()
      let drawingCtx = drawingElement.getContext("2d")
      let renderingCtx = renderingElement.getContext("2d")
      let lastX
      let lastY
      let moving = false

      renderingCtx.globalCompositeOperation = "source-over"
      renderingCtx.fillStyle = currentTheme === "dark" ? "#000000" : "#ffffff"
      renderingCtx.fillRect(0, 0, size.width, size.height)

      renderingElement.addEventListener("mouseover", ev => {
        moving = true
        lastX = ev.pageX - renderingElement.offsetLeft
        lastY = ev.pageY - renderingElement.offsetTop
      })

      renderingElement.addEventListener("click", ev => {
        moving = true
        lastX = ev.pageX - renderingElement.offsetLeft
        lastY = ev.pageY - renderingElement.offsetTop
      })

      renderingElement.addEventListener("mouseup", ev => {
        moving = false
        lastX = ev.pageX - renderingElement.offsetLeft
        lastY = ev.pageY - renderingElement.offsetTop
      })

      renderingElement.addEventListener("mousemove", ev => {
        if (moving) {
          drawingCtx.globalCompositeOperation = "source-over"
          renderingCtx.globalCompositeOperation = "destination-out"
          let currentX = ev.pageX - renderingElement.offsetLeft
          let currentY = ev.pageY - renderingElement.offsetTop
          drawingCtx.lineJoin = "round"
          drawingCtx.moveTo(lastX, lastY)
          drawingCtx.lineTo(currentX, currentY)
          drawingCtx.closePath()
          drawingCtx.lineWidth = 20
          drawingCtx.stroke()
          lastX = currentX
          lastY = currentY
          renderingCtx.drawImage(drawingElement, 0, 0)
        }
      })
    }, [currentTheme])
  
  const parent = {
    initial: {
      y: 800
      
    },
    animate: {
      y: 0,
      transition: {
        staggerChildren:.2
      }
    }
  }

    const children = {
      initial: {
        y: 800,
      },
      animate: {
        y: 0,
        transition: {
          duration: 1,
          ease:[.6, .05, -0.01, 0.9]
        },
      },
    }
  
    
  return (
    <Banner>
      <Video>
        <video
          height="100%"
          width="100%"
          loop
          autoPlay
          muted
          src={require("../../assets/video/video.mp4")}
        />
      </Video>
      <Canvas ref={canvas} height={size.height} width={size.width} onMouseLeave={onCursor} onMouseEnter={() =>onCursor('hovered')}/>

      <BannerTitle variants={parent} initial='initial' animate='animate'>
        <Headline variants={children}>DIG</Headline>
        <Headline variants={children}>DEEP</Headline>
      </BannerTitle>
    </Banner>
  )
}

export default HomeBanner
