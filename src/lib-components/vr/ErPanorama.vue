<template>
  <div ref="container" class="container"></div>
</template>

<script>
import {onMounted, ref} from "vue";
import helpers from "./helpers";

export default {
  name: "VrPanorama",
  props:{
    src:String,
  },
  setup(props,){
    const container = ref(null)
    const {init,animate} = helpers(container, props.src)
    onMounted(() => {
      init()
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