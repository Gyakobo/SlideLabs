<template>
  <div class="work-sheet-wrapper">
    <div class="work-sheet" :style="{width:width + 'px', height:height + 'px'}">
      <sl_container ref="root_container" id="root_container">
      </sl_container>
    </div>
  </div>
</template>

<script>
import sl_container from "../sl_components/sl_container";

export default {
  components:{
    sl_container
  },
  data (){
    return {
      aspect_ratio_wh: 16/9
    }
  },
  computed:{
    width(){
      let state = this.$store.state
      return state.screen_width - state.sidebar_left_width - state.sidebar_right_width
    },
    height(){
      return this.width / this.aspect_ratio_wh
    }
  },
  mounted() {
    this.$store.state.root_container = this.$refs.root_container
  }
}
</script>

<style scoped>
.work-sheet-wrapper{
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 100%;
  width: fit-content;
}

.work-sheet{
  margin: 15px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

</style>
