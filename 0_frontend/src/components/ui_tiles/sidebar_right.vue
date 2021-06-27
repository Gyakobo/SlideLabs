<template>
  <div id="sidebar_right_wrapper" style="min-width: 200px; max-width:400px">
    <div class="sidebar-right no-pointer">
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
  mounted() {
    let wrapper = document.getElementById('sidebar_right_wrapper')
    wrapper.style.width = this.$store.state.sidebar_right_width + 'px'

    let resizer = new drag_resizer.DragResizer()
    resizer.set_element(wrapper)
    resizer.read_constraints_from_style()
    resizer.set_actions(['left'])
    resizer.set_enable_cursor_styling(true)
    resizer.set_on_width_change_callback(
        (new_value) => {
          this.$store.state.sidebar_right_width = parseFloat(new_value)
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

  cursor: col-resize;
}

.no-pointer{
  cursor: default;
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
