
<template>
  <div id="app">
    <vue3-panorama-sample />

       <panorama 
              :src="vista['image']"
              repeat
              :compass-image="project['vista_simulator'].image"
              default-direction="北" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import { Panorama } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {Panorama},
  setup(){
      const vista = ref({image:null,})

    //   const image = ref(
    //       {
    //           src : require
    //       }
    //   )
      return {
          vista,
      }
  }
});
</script>

