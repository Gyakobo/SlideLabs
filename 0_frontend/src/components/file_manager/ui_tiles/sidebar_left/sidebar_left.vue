<template>
  <div
      ref="sidebar_wrapper"
      class="sidebar_wrapper"
      :style="{
        width:wrapper_width
      }"
  >
    <div class="sidebar-left">
      <tab_file_groups></tab_file_groups>
    </div>
  </div>
</template>

<script>
import tab_file_groups from "./children/tab_file_groups"
import drag_resizer from "../../../../../../3_js_common/utils/drag_resize/drag_resizer";

export default {
  components:{
    tab_file_groups
  },
  data (){
    return {
    }
  },
  computed:{
    wrapper_width(){
      return this.$store.state.sidebar_left_width + 'px'
    }
  },
  mounted() {
    let resizer = new drag_resizer.DragResizer()
    resizer.set_element(this.$refs.sidebar_wrapper)
    resizer.set_constraints({
      min_width:200,
      max_width:400
    })
    resizer.set_actions(['right'])
    resizer.set_update_size_callback(
        (w) => {
          this.$store.state.sidebar_left_width = w
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

  border-right: 5px solid #999;
}

.sidebar-left{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--blue-dark);
}

</style>
