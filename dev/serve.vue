<template>
  <div id="app">
    <flat-panorama :src="require('../src/assets/img/7f.jpeg')"
                   :start-degree="degree"
                   repeat
                   directions>
      <img class="img" :src="require('../src/assets/img/shinmachi.jpg')" alt="">
    </flat-panorama>
  </div>
</template>
<script>
import {defineComponent, ref} from 'vue';
import {FlatPanorama} from "../src/lib-components";

export default defineComponent({
  name: 'ServeDev',
  components: {
   FlatPanorama,
  },
  setup(){
    const degree = ref(-70)
    return {degree}

  }
});
</script>
<style>
.img {
  width: 174px;
}
</style>

