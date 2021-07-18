import drag_resizer from "./drag_resizer";

export default {
  data(){
    return {
      root_element:null,
      resizer: null,
    }
  },
  props:{
    is_drag_resizer_enabled:{
      type:Boolean,
      default:true,
    }
  },
  computed:{
    slide_w_px(){
      return this.$store.state.presentation.slide_w_px
    },
    dr_params(){
      let params = this.components_tree_item.params
      if (params === null || params.drag_resizer === undefined) {
        return null
      }
      return params.drag_resizer
    },
    root_element_dr_style(){
      let dr_params = this.dr_params
      if (dr_params === null){
        return {}
      }

      let slide_w_px = this.slide_w_px

      let style = {}
      if (dr_params.x !== undefined){
        style.left = dr_params.x * slide_w_px + 'px'
      }
      if (dr_params.y !== undefined){
        style.top = dr_params.y * slide_w_px + 'px'
      }
      if (dr_params.width !== undefined){
        style.width = dr_params.width * slide_w_px + 'px'
      }
      if (dr_params.height !== undefined){
        style.height = dr_params.height * slide_w_px + 'px'
      }
      return style
    }
  },
  mounted() {
    if (!this.is_drag_resizer_enabled || !this.$store.state.presentation.is_editable){
      return
    }

    this.root_element = document.getElementById(this.components_tree_item.id)

    let resizer = new drag_resizer.DragResizer()
    resizer.set_element(this.root_element)
    resizer.set_actions(['drag'])
    resizer.set_update_size_callback(
      (w_px,h_px) => {
        let  dr_params = this.dr_params
        if (dr_params === null){
          return
        }

        let slide_w_px = this.slide_w_px

        if (dr_params.width !== undefined){
          dr_params.width = w_px / slide_w_px
        }
        if (dr_params.height !== undefined){
          dr_params.height = h_px / slide_w_px
        }
      }
    )
    resizer.set_update_position_callback(
      (x_px,y_px) => {
        let  dr_params = this.dr_params
        if (dr_params === null){
          return
        }

        let slide_w_px = this.slide_w_px

        if (dr_params.x !== undefined){
          dr_params.x = x_px / slide_w_px
        }
        if (dr_params.y !== undefined){
          dr_params.y = y_px / slide_w_px
        }
      }
    )
    resizer.add_listeners()
    this.resizer = resizer
  },
  beforeUnmount() {
    if (!this.is_drag_resizer_enabled){
      return
    }

    this.resizer.remove_listeners()
  }
}
