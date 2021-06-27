export default {
  methods:{
    get_ctree_root(){
      console.log('get_ctree_root', this.$store.state.components_tree_root)
      return this.$store.state.components_tree_root
    },
    set_ctree_root(component){
      console.log('set_ctree_root', component)
      this.$store.state.components_tree_root = component
    },

    is_container(component){
      console.log('is container', component)
      return component.container_flag !== undefined
    }
  }
}