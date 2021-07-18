<template>
  <div
      ref="sidebar_wrapper"
      class="sidebar_wrapper"
      :style="{
        width:wrapper_width
      }"
  >
    <div class="sidebar-right">
      <tab_file_params></tab_file_params>
    </div>
  </div>
</template>

<script>
import tab_file_params from "./children/tab_file_params";
import drag_resizer from "../../../../../../3_js_common/utils/drag_resize/drag_resizer";

export default {
  components:{
    tab_file_params
  },
  data (){
    return {
    }
  },
  computed:{
    wrapper_width(){
      return this.$store.state.sidebar_right_width + 'px'
    }
  },
  mounted() {
    let resizer = new drag_resizer.DragResizer()
    resizer.set_element(this.$refs.sidebar_wrapper)
    resizer.set_constraints({
      min_width:200,
      max_width:400
    })
    resizer.set_actions(['left'])
    resizer.set_update_size_callback(
        (w) => {
          this.$store.state.sidebar_right_width = w
        }
    )
    resizer.add_listeners()
    this.resizer = resizer
  },
  beforeUnmount() {
    this.resizer.remove_listeners()
  }
}
</script>

<style scoped>
.sidebar_wrapper{
  height: 100%;

  border-left: 5px solid #999;
}

.sidebar-right{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;

  font-size: 20px;
}

</style>
