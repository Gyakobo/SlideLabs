<template>
  <div class="work-sheet-wrapper">
    <div class="work-sheet" :style="{width:width + 'px', height:height + 'px'}">
      <sl_container
          ref="root_container"
          id="root_container"
          @pointerover="on_pointerover"
          @pointerout="on_pointerout">
      </sl_container>
    </div>
  </div>
</template>

<script>
import sl_container from "../sl_components/sl_container";
import drag_resizer from "../../utils/drag_resize/drag_resizer";
import components_tree_controller_mixin from "../../store/components_tree_controller_mixin";

export default {
  components:{
    sl_container
  },
  mixins:[
    components_tree_controller_mixin
  ],
  data (){
    return {
      aspect_ratio_wh: 16/9,
      root_element:null,
      resizer: null,
    }
  },
  computed:{
    width(){
      let state = this.$store.state
      return state.screen_width - state.sidebar_left_width - state.sidebar_right_width - 30.5
    },
    height(){
      return this.width / this.aspect_ratio_wh
    }
  },
  methods:{
    get_real_target(target){
      let is_success = false
      for (let i = 0; i < 100; i++){
        if (target.classList.contains('sl')){
          is_success = true
          break
        }else{
          target = target.parentNode
        }
      }
      if (!is_success){
        console.log('Error: Max tree depth reached!')
        return null
      }
      return target
    },
    on_pointerover(event){
      if (this.resizer.action !== null){
        return
      }

      let target = this.get_real_target(event.target)
      target.style.background = 'pink'

      if (target !== this.root_element){
        this.resizer.on_focus_exit()
        this.resizer.set_element(target)
      }
    },
    on_pointerout(event){
      if (this.resizer.action !== null){
        return
      }

      let target = this.get_real_target(event.target)
      target.style.background = ''
    }
  },
  mounted() {
    this.set_ctree_root(this.$refs.root_container)
    this.root_element = document.getElementById('root_container')

    let resizer = new drag_resizer.DragResizer()
    resizer.set_enable_cursor_styling(true)
    resizer.set_actions()
    resizer.add_listeners()
    this.resizer = resizer
  },
  beforeUnmount() {
    this.resizer.remove_listeners()
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
