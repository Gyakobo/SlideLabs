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
  methods:{
    init_position(x,y){
      let style = this.components_tree_item.params.root_element_style
      style.left = x + 'px'
      style.top = y + 'px'
    },
    init_size(w,h){
      let style = this.components_tree_item.params.root_element_style
      style.width = w + 'px'
      style.height = h + 'px'
    }
  },
  mounted() {
    if (!this.is_drag_resizer_enabled){
      return
    }

    this.root_element = document.getElementById(this.components_tree_item.id)

    let resizer = new drag_resizer.DragResizer()
    resizer.set_element(this.root_element)
    resizer.set_actions(['drag'])
    resizer.set_update_size_callback(
      (w,h) => {
        let style = this.components_tree_item.params.root_element_style
        style.width = w + 'px'
        style.height = h + 'px'
      }
    )
    resizer.set_update_position_callback(
      (x,y) => {
        let style = this.components_tree_item.params.root_element_style
        style.left = x + 'px'
        style.top = y + 'px'
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
