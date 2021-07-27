<template>
  <div ref="container" id="er-pano" class="container"></div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import helpers from "./helpers";

export default {
  name: "VrPanorama",
  props:{
    src:String,
  },
  setup(props,){
    const container = ref(null)
    const source = ref(null)
    const {init,animate} = helpers()

    watch(() => props.src, (val) => {
      init(container, val)
      animate()
      container.value.removeChild(container.value.firstElementChild)
    })

    onMounted(() => {
      source.value = props.src
      init(container, source.value)
      animate()
    })

    return {
      container,
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>