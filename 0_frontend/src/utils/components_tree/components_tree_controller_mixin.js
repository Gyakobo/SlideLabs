let TreeItem = function (type, id, parent=null){
  this.type = type
  this.is_folder = (type === 'sl_container')

  this.id = id

  this.is_active = false

  if (this.is_folder){
    this.children = []
    this.next_id = 1
  }

  this.params = null

  this.parent = parent
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

TreeItem.prototype.remove_child = function (id) {
  for(let i = 0; i < this.children.length; i++){
    let child = this.children[i]
    if (child.id === id){
      this.children.splice(i, 1)
      return true
    }
  }
  return false
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

    deserialize_ctree(ctree_json, parent=null){
      if (ctree_json === null){
        return new TreeItem('sl_container', 'root_container')
      }

      let tree_item = new TreeItem('', null, parent)
      Object.assign(tree_item, ctree_json)

      if (tree_item.is_folder){
        for(let i = 0; i < tree_item.children.length; i++){
          let child_json = tree_item.children[i]
          tree_item.children[i] = this.deserialize_ctree(child_json, tree_item)
        }
      }
      return tree_item
    },
    serialize_ctree(ctree_obj){
      let ctree_json = {
        type: ctree_obj.type,
        is_folder: ctree_obj.is_folder,
        id: ctree_obj.id,
        params: ctree_obj.params,
      }
      if (ctree_obj.is_folder){
        let children = []

        for(let i = 0; i < ctree_obj.children.length; i++){
          let child_obj = ctree_obj.children[i]
          children.push( this.serialize_ctree(child_obj) )
        }
        ctree_json['children'] = children
      }
      return ctree_json
    },
    set_active_component(component, event=null){
      if (event !== null){
        event.stopPropagation()
      }

      let state = this.$store.state

      if (state.active_component !== null){
        state.active_component.is_active = false
      }

      if (component === null){
        return
      }
      state.active_component = component
      component.is_active = true
    },
  }
}