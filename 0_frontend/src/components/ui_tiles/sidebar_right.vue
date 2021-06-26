<template>
  <resizable
      id="sidebar-right-resizer"
      ref="sidebar_right_resizer"
      :init_width="$store.state.sidebar_right_width + 'px'"
      :min_width="100"
      :max_width="500"
      :padding_tblr="[0,0,10,0]"
  >
    <div class="sidebar_right">
      <div>
        {{text}}
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
      text:'This is right sidebar',
    }
  },
  mounted() {
    this.$watch(
        "$refs.sidebar_right_resizer.width",
        (new_value) => {
          this.$store.state.sidebar_right_width = parseFloat(new_value)
        }
    );
  }
}
</script>

<style scoped>
.sidebar_right{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--blue-dark);

  font-size: 20px;
}

</style>
