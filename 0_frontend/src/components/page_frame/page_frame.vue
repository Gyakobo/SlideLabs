<template>
  <page_frame_widget>
    <router-view></router-view>
  </page_frame_widget>
</template>

<script>
  import page_frame_widget from "./page_frame_widget";

  export default {
    components:{
      page_frame_widget
    },
    data(){
      return{
      }
    },
  }
</script>


<style scoped>
</style>
