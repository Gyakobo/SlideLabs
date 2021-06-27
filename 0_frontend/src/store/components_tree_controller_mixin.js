export default {
  methods:{
    get_ctree_root(){
      return this.$store.state.components_tree_root
    },
    set_ctree_root(component){
      this.$store.state.components_tree_root = component
    },

    is_container(component){
      return component.container_flag !== undefined
    }
  }
}