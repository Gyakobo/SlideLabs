<template>
  <resizable
      id="sidebar-left-resizer"
      ref="sidebar_left_resizer"
      :init_width="$store.state.sidebar_left_width + 'px'"
      :min_width="100"
      :max_width="500"
      :padding_tblr="[0,0,0,10]"
  >
    <div class="sidebar_left">
      <div>
        {{text}}
        {{$store.state.screen_width}}
      </div>
    </div>
  </resizable>
</template>

<script>
import resizable from "./resizable";

export default {
  components:{
    resizable
  },
  data (){
    return {
      text:'This is sidebar',
    }
  },
  mounted() {
    this.$watch(
        "$refs.sidebar_left_resizer.width",
        (new_value) => {
          this.$store.state.sidebar_left_width = parseFloat(new_value)
        }
    );
  }
}
</script>

<style scoped>
.sidebar_left{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--blue-dark);

  font-size: 20px;
}

</style>
