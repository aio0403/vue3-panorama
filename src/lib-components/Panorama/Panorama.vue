<template>
  <transition name="slideFade">
    <div v-if="state" class="panorama"
         @mousedown="mouseDownHandler"
         @mousemove="mouseMoveHandler"
         @touchstart="touchStartHandler"
         @touchmove="touchMoveHandler"
         ref="panorama"
         :style="{backgroundImage:'url('+src+')'}">

      <div class="compass flex align-center justify-center relative">
        <img class="compass-bg" :src="compassImage" alt="compass image">
        <img ref="compass" class="compass-img" src="../../assets/svg/compass.svg" alt="compass">
      </div>
    </div>
  </transition>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from "vue";
import rawImageSizer from "../../utils/useRawImageSizer"

export default {
  name: "Panorama",
  props:{
    src:String,
    compass: Boolean,
    repeat:Boolean,
    cSrcArray:String,
    compassImage:String,
    defaultDirection:String,
  },
  setup(props,){
    const state = ref(true)
    const panorama = ref(null)
    const compass = ref(null)
    const dc = ref(0)
    const md = ref(false)
    const iw = ref(null)
    const ih = ref(null)
    const dp = ref(0)
    const ep = ref(0)
    const sp = ref(0)
    const cp = ref(0)
    const display = ref(false)

    onMounted(() => {
      props.repeat ? panorama.value.style.backgroundRepeat = "repeat-x" : panorama.value.style.backgroundRepeat = "no-repeat"
      window.addEventListener("mouseup", mouseUpHandler)
      window.addEventListener("resize", resizeHandler)
      setTimeout(() => {
        setDefaultDegree()
        init()
      }, 200)
    })

    onUnmounted(() => {
      window.removeEventListener(("mouseup"), mouseUpHandler)
      window.removeEventListener(("resize"), resizeHandler)
    })

    // mouse handlers
    const mouseDownHandler = (e) =>{
      e.preventDefault();
      clicked()
      md.value = true
      sp.value = e.pageX
      ep.value = getBgX()
    }
    function mouseUpHandler(e){
      e.stopPropagation()
      unclicked()
      md.value = false
    }
    const mouseMoveHandler = (e) => {
      if (md.value) {
        let mpos = e.pageX || sp.value, x;
        x = (100 * (mpos - sp.value)) / panorama["value"].scrollWidth;
        cp.value = ep.value + x * 10
        panorama["value"].style.setProperty('--x', cp.value + "px");
        setDegree()
      }
    }
    function clicked() {
      panorama["value"].style.cursor = "grabbing"
    }
    function unclicked() {
      panorama["value"].style.cursor = "grab"
    }

    // mouse handlers
    const touchStartHandler = (e) =>{
      e.preventDefault();
      sp.value = e.touches[0].pageX
      ep.value = getBgX()
    }
    const touchMoveHandler = (e) => {
      e.preventDefault();
      let mpos = e.changedTouches[0].pageX || sp.value, x;
      if (mpos !== sp.value)
        x = (100 * (mpos - sp.value)) / panorama["value"].scrollWidth;
      cp.value = ep.value + x * 10
      panorama["value"].style.setProperty('--x', cp.value + "px");
      setDegree()
    }

    function resizeHandler(){
      init()
    }

    function getBgX(){
      return parseFloat(getComputedStyle(panorama["value"]).getPropertyValue("background-position-x"))
    }

    function setDegree(){
      let ww = getComputedStyle(panorama["value"]).height.replace("px", "") / ih.value * iw.value
      let x = getBgX()
      let d = 360 / ww
      let r = (x - dp.value) * d * -1;
      compass["value"].style.transform = "rotate(" + (r+dc.value) + "deg)"
    }

    function setDefaultDegree(){
      if (props.defaultDirection === "東"){
        dc.value = -70
      } else if (props.defaultDirection === "西"){
        dc.value = 110
      } else if (props.defaultDirection === "北"){
        dc.value = 210
      } else if (props.defaultDirection === "南"){
        dc.value = 20
      }
    }

    function init(){
      iw.value = rawImageSizer(panorama["value"]).width
      ih.value = rawImageSizer(panorama["value"]).height
      setDegree()
    }

    return {
      state, panorama, compass, display,
      mouseDownHandler, touchStartHandler,
      mouseMoveHandler, touchMoveHandler,
    }
  }
}
</script>

<style scoped>
.panorama {
  height: 100%;
  width: 100%;
  background-repeat: repeat-x;
  background-size: auto 100%;
  background-position-x: var(--x);
  cursor: grab;
}
.panorama > .compass {
  position: absolute;
  z-index: 2;
  top: 30px;
  right: 30px;
  width: auto;
  height: auto;
  border-radius: 14px;
  padding: 20px;
}
.panorama > .compass > img.compass-bg {
  border-radius: 14px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
}
.panorama > .compass > img.compass-img {
  position: relative;
  z-index: 2;
  width: 130px;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}


</style>