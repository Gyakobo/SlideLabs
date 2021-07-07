<template>
  <div
      id="sidebar_left_wrapper"
      style="min-width: 200px; max-width:400px"
      :style="{
        width:wrapper_width
      }"
  >
    <div class="sidebar-left">
      <div class="ui icon buttons">
        <button
            v-for="tab in tabs"
            :key="tab.name"
            class="ui button"
            :class="{
              active: current_tab === tab.name
            }"
            @click="current_tab = tab.name"
        >
          <i class="icon" :class="tab.classes"></i>
        </button>
      </div>
      <keep-alive>
        <component :is="current_tab"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import tab_slide_settings from "./children/tab_slide_settings";
import tab_components_tree from "./children/tab_components_tree";
import tab_components_add from "./children/tab_components_add";
import drag_resizer from "../../../../utils/drag_resize/drag_resizer";

export default {
  components:{
    tab_slide_settings, tab_components_tree, tab_components_add
  },
  data (){
    return {
      current_tab: 'tab_slide_settings',
      tabs:[
        {
          name:'tab_slide_settings',
          classes:['edit']
        },
        {
          name:'tab_components_tree',
          classes:['sitemap']
        },
        {
          name:'tab_components_add',
          classes:['plus', 'square', 'outline']
        }
      ]
    }
  },
  computed:{
    wrapper_width(){
      return this.$store.state.sidebar_left_width + 'px'
    }
  },
  mounted() {
    let wrapper = document.getElementById('sidebar_left_wrapper')

    let resizer = new drag_resizer.DragResizer()
    resizer.set_element(wrapper)
    resizer.read_constraints_from_style()
    resizer.set_actions(['right'])
    resizer.set_enable_cursor_styling(true)
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
#sidebar_left_wrapper{
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

  font-size: 20px;
}

</style>
