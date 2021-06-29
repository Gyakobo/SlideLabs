let TreeItem = function (type, id, parent=null){
  this.type = type
  this.is_folder = (type === 'sl_container')

  this.id = id
  this.parent = parent

  this.is_active = false

  if (this.is_folder){
    this.children = []
    this.next_id = 1
  }
}

TreeItem.prototype.add_child = function (type, id=null) {
  if(!this.is_folder){
    return
  }

  if (id === null){
    id = 'item' + this.next_id
    this.next_id += 1
  }

  let item = new TreeItem(type, id, this)
  this.children.push(item)
}

export default {
  methods:{
    get_ctree_root(){
      let state = this.$store.state

      if (state.components_tree_root === null){
        state.components_tree_root = new TreeItem('sl_container', 'root_container')
      }
      return state.components_tree_root
    },

    get_active_component(){
      return this.$store.state.active_component
    },
    set_active_component(component){
      let state = this.$store.state

      if (state.active_component !== null){
        state.active_component.is_active = false
      }

      state.active_component = component
      component.is_active = true
    },
  }
}