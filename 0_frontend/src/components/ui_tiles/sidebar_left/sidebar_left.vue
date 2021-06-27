<template>
  <div id="sidebar_left_wrapper" style="min-width: 200px; max-width:400px">
    <div class="sidebar-left no-pointer">
      <div class="ui icon buttons">
        <button
            class="ui button"
            :class="{
              active: current_tab === 'tab_components_tree'
            }"
            @click="current_tab = 'tab_components_tree'"
        ><i class="sitemap icon"></i></button>
        <button
            class="ui button"
            :class="{
              active: current_tab === 'tab_components_add'
            }"
            @click="current_tab = 'tab_components_add'"
        ><i class="plus square outline icon"></i></button>
      </div>
<!--      <keep-alive>-->
<!--        <component :is="current_tab"></component>-->
<!--      </keep-alive>-->
      <component :is="current_tab"></component>
    </div>
  </div>
</template>

<script>
import tab_components_tree from "./children/tab_components_tree";
import tab_components_add from "./children/tab_components_add";
import drag_resizer from "../../../utils/drag_resize/drag_resizer";

export default {
  components:{
    tab_components_tree, tab_components_add
  },
  data (){
    return {
      current_tab: 'tab_components_tree'
    }
  },
  mounted() {
    let wrapper = document.getElementById('sidebar_left_wrapper')
    wrapper.style.width = this.$store.state.sidebar_left_width + 'px'

    let resizer = new drag_resizer.DragResizer()
    resizer.set_element(wrapper)
    resizer.read_constraints_from_style()
    resizer.set_actions(['right'])
    resizer.set_enable_cursor_styling(true)
    resizer.set_on_width_change_callback(
        (new_value) => {
          this.$store.state.sidebar_left_width = parseFloat(new_value)
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
#sidebar_left_wrapper{
  height: 100%;

  border-right: 5px solid #999;

  cursor: col-resize;
}

.no-pointer{
  cursor: default;
}

.sidebar-left{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--blue-dark);

  font-size: 20px;
}

</style>
