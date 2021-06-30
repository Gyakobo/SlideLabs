<template>
  <div
      id="sidebar_right_wrapper"
      style="min-width: 200px; max-width:400px"
      :style="{
        width:wrapper_width
      }"
  >
    <div class="sidebar-right">
      <div>
        {{text}}
      </div>
    </div>
  </div>
</template>

<script>
import drag_resizer from "../../utils/drag_resize/drag_resizer";

export default {
  data (){
    return {
      text:'This is right sidebar',
    }
  },
  computed:{
    wrapper_width(){
      return this.$store.state.sidebar_right_width + 'px'
    }
  },
  mounted() {
    let wrapper = document.getElementById('sidebar_right_wrapper')

    let resizer = new drag_resizer.DragResizer()
    resizer.set_element(wrapper)
    resizer.read_constraints_from_style()
    resizer.set_actions(['left'])
    resizer.set_enable_cursor_styling(true)
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
#sidebar_right_wrapper{
  height: 100%;

  border-left: 5px solid #999;
}

.sidebar-right{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--blue-dark);

  font-size: 20px;
}

</style>
