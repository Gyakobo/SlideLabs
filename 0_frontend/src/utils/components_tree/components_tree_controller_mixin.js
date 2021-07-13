let TreeItem = function (type, id){
  this.type = type
  this.is_folder = (type === 'sl_container')

  this.id = id

  this.is_active = false

  if (this.is_folder){
    this.children = []
    this.next_id = 1
  }

  this.params = {
    root_element_style:{}
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
      let current_slide = this.$store.state.presentation_editor.current_slide
      if (current_slide === null){
        return null
      }

      return current_slide.components_tree
    },

    deserialize_ctree(ctree_json){
      if (ctree_json === null){
        return new TreeItem('sl_container', 'root_container')
      }

      let tree_item = new TreeItem('', null)
      Object.assign(tree_item, ctree_json)

      if (tree_item.is_folder){
        for(let i = 0; i < tree_item.children.length; i++){
          let child_json = tree_item.children[i]
          tree_item.children[i] = this.deserialize_ctree(child_json)
        }
      }
      return tree_item
    },

    get_active_component(){
      return this.$store.state.active_component
    },
    set_active_component(component, event=null){
      if (event != null){
        event.stopPropagation()
      }

      let state = this.$store.state

      if (state.active_component !== null){
        state.active_component.is_active = false
      }

      state.active_component = component
      component.is_active = true
    },
  }
}