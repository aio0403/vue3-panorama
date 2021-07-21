<template>
  <transition name="slideFade">
    <div class="panorama"
         @mousedown="mouseDownHandler"
         @mousemove="mouseMoveHandler"
         @touchstart="touchStartHandler"
         @touchmove="touchMoveHandler"
         ref="panorama"
         :style="{backgroundImage:'url('+src+')'}">

      <div v-if="directions" class="image-wrapper flex align-center justify-center relative">

        <svg ref="compass" class="compass-img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 200 200">
          <defs>
            <linearGradient id="linear-gradient" x1="0.5" y1="0.299" x2="0.5" y2="0.943" gradientUnits="objectBoundingBox">
              <stop offset="0" stop-color="#8cc2c9" stop-opacity="0.902"/>
              <stop offset="1" stop-color="#466165" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <g  transform="translate(-242 -187)">
            <circle id="Ellipse_1" data-name="Ellipse 1" cx="100" cy="100" r="100" transform="translate(242 187)" fill="rgba(219,239,240,0.34)"/>
            <circle id="Ellipse_2" data-name="Ellipse 2" cx="55" cy="55" r="55" transform="translate(287 232)" fill="rgba(141,195,188,0.27)"/>
            <path id="Polygon_1" data-name="Polygon 1" d="M40.168,22.727a12,12,0,0,1,21.665,0l31.987,67.11A12,12,0,0,1,82.987,107H19.013A12,12,0,0,1,8.181,89.837Z" transform="translate(292 273)" fill="url(#linear-gradient)"/>
          </g>
        </svg>

        <slot></slot>

      </div>
    </div>
  </transition>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from "vue";
import helpers from "./helpers";

export default {
  name: "Panorama",
  props:{
    src:String,
    repeat:Boolean,
    directions:Boolean,
    startDegree: {
      type:Number,
      default:0,
    },
  },
  setup(props,){
    const {
      panorama, compass,
      init,
      mouseDownHandler, mouseUpHandler, mouseMoveHandler,
      touchStartHandler, touchMoveHandler,
    } = helpers(props.startDegree, props.repeat)

    onMounted(() => {
      window.addEventListener("mouseup", mouseUpHandler)
      init()
    })

    onUnmounted(() => {
      window.removeEventListener(("mouseup"), mouseUpHandler)
    })

    return {
      panorama, compass,
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
.panorama > .image-wrapper {
  position: absolute;
  z-index: 2;
  top: 10px;
  right: 10px;
  width: auto;
  height: auto;
  border-radius: 14px;
}
.panorama > .image-wrapper > svg.compass-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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