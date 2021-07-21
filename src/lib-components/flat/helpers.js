import {ref} from "vue";
import rawImageSizer from "./utils";
export default function (startDegree, repeat) {
  const clicked = ref(false)
  const endX = ref(0)
  const startX = ref(0)
  const currentX = ref(0)
  const dp = ref(0)
  const defaultX = ref(0)
  const imageWidth = ref(0)
  const imageHeight = ref(0)
  const compass = ref(null)
  const panorama = ref(null)

  const mouseDownHandler = (e) =>{
    e.preventDefault();
    click()
    startX.value = e.pageX
    endX.value = getBgX()
  }
  const mouseUpHandler = (e) => {
    e.stopPropagation()
    unclick()
    clicked.value = false
  }
  const mouseMoveHandler = (e) => {
    if (clicked.value) {
      let mpos = e.pageX || startX.value, x;
      x = (100 * (mpos - startX.value)) / panorama.value.scrollWidth;
      const xpos = endX.value + x * 10
      if (repeat) {
        mover(e)
      } else if (!repeat && (0 > xpos && xpos > -imageWidth.value)) {
        mover(e)
      }
    }
  }
  function click() {
    clicked.value = true
    panorama.value.style.cursor = "grabbing"
  }
  function unclick() {
    panorama.value.style.cursor = "grab"
  }

  const touchStartHandler = (e) =>{
    e.preventDefault();
    startX.value = e.touches[0].pageX
    endX.value = getBgX()
  }
  const touchMoveHandler = (e) => {
    e.preventDefault();
    let mpos = e.changedTouches[0].pageX || startX.value, x;
    if (mpos !== startX.value)
      x = (100 * (mpos - startX.value)) / panorama.value.scrollWidth;
    currentX.value = endX.value + x * 10
    panorama.value.style.setProperty('--x', currentX.value + "px");
    setDegree()
  }

  function mover(e){
    let mpos = e.pageX || startX.value, x;
    x = (100 * (mpos - startX.value)) / panorama.value.scrollWidth;
    currentX.value = endX.value + x * 10
    panorama.value.style.setProperty('--x', currentX.value + "px");
    setDegree()
  }


  const getBgX = () => {
    return parseFloat(getComputedStyle(panorama.value).getPropertyValue("background-position-x"))
  }

  function setDegree(){
    let ww = getComputedStyle(panorama["value"]).height.replace("px", "") / imageHeight.value * imageWidth.value
    let x = getBgX()
    let d = 360 / ww
    let r = (x - dp.value) * d * -1;
    if (compass.value)
      compass["value"].style.transform = "translate(-50%, -50%) rotate(" + (r+defaultX.value) + "deg)"
  }

  const init = () => {
    defaultX.value = startDegree
    setTimeout(() => {
      imageWidth.value = rawImageSizer(panorama["value"]).width
      imageHeight.value = rawImageSizer(panorama["value"]).height
      setDegree()
    }, 150)
  }

  return {
    panorama, compass,
    init, getBgX, setDegree,
    mouseDownHandler, mouseUpHandler, mouseMoveHandler,
    touchStartHandler, touchMoveHandler,
  }
}