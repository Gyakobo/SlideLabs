import drag_resizer from "./drag_resizer";

export default {
  data(){
    return {
      root_element:null,
      resizer: null,

      dr_width:0,
      dr_height:0,
      dr_left:100,
      dr_top:0,
    }
  },
  props:{
    is_drag_resizer_enabled:{
      type:Boolean,
      default:true,
    }
  },
  computed:{
    dr_style(){
      if (!this.is_drag_resizer_enabled){
        return null
      }

      return {
        width: this.dr_width + 'px',
        height: this.dr_height + 'px',
        left: this.dr_left + 'px',
        top: this.dr_top + 'px'
      }
    },
  },
  methods:{
    init_position(x,y){
      this.dr_left = x
      this.dr_top = y
    },
    init_size(w,h){
      this.dr_width = w
      this.dr_height = h
    }
  },
  mounted() {
    if (!this.is_drag_resizer_enabled){
      return
    }

    this.root_element = document.getElementById(this.components_tree_item.id)

    let resizer = new drag_resizer.DragResizer()
    resizer.set_element(this.root_element)
    resizer.enable_default_constraints()
    resizer.set_actions(['drag'])
    resizer.set_enable_cursor_styling(true)
    resizer.set_update_size_callback(
      (w,h) => {
        this.dr_width = w
        this.dr_height = h
      }
    )
    resizer.set_update_position_callback(
      (x,y) => {
        this.dr_left = x
        this.dr_top = y
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
