<template>
  <div id="app">
<!--    <flat-panorama :src="require('../src/assets/img/7f.jpeg')"-->
<!--                   :start-degree="degree"-->
<!--                   repeat-->
<!--                   directions>-->
<!--      <img class="img" :src="require('../src/assets/img/shinmachi.jpg')" alt="">-->
<!--    </flat-panorama>-->
<!--    n_001-->


    <er-panorama :src="require('../src/assets/img/n_001.jpg')" />
  </div>
</template>
<script>
import {defineComponent, ref} from 'vue';
import {FlatPanorama, ErPanorama} from "../src/lib-components";

export default defineComponent({
  name: 'ServeDev',
  components: {
    ErPanorama,
    FlatPanorama,
  },
  setup(){
    const degree = ref(-70)
    return {degree}
  }
});
</script>

