<template>
  <div class="work-sheet-wrapper">
    <div class="work-sheet" :style="{width:width + 'px', height:height + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
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
