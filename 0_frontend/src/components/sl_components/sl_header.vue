<template>
  <div
      :id="components_tree_item.id"
      class="sl header"
      :class="{active:components_tree_item.is_active}"
      :style="components_tree_item.params.root_element_style"
      @pointerdown="set_active_component(components_tree_item, $event)"
      @dblclick="edit_text();"
      @keydown.enter.prevent
      @keyup.escape="quit_edit_text();"
      @keyup.enter="quit_edit_text();"
  >
    <h1
        class="ui header"
        :class="{on_text_edit: edit_text_flag}"
        spellcheck=false
    >
      Example Text
    </h1>
  </div>
</template>

<script>
import draggable_resizable_component_mixin from "../../utils/drag_resize/draggable_resizable_component_mixin";
import components_tree_controller_mixin from "../../utils/components_tree/components_tree_controller_mixin";

export default {
  mixins:[
    draggable_resizable_component_mixin,
    components_tree_controller_mixin
  ],
  data (){
    return {
      edit_text_flag:	false,
    }
  },
  props:{
    components_tree_item:{
      type:Object,
      required:true,
    }
  },
  computed:{
    is_active(){
      return this.components_tree_item.is_active
    }
  },
  watch:{
    is_active(new_value){
      if(new_value){
        this.resizer.set_actions(['top', 'bottom', 'left', 'right', 'drag'])
      }else{
        this.resizer.set_actions(['drag'])
        this.quit_edit_text()
      }
    }
  },
  methods: {
    edit_text() {
      let h1 = this.root_element.getElementsByTagName("h1")[0]
      h1.contentEditable = true
      this.edit_text_flag = true;
    },
    quit_edit_text() {
      let h1 = this.root_element.getElementsByTagName("h1")[0]
      h1.contentEditable = false
      this.edit_text_flag = false;
    },
  },
  created() {
    this.init_position(0, 0)
    this.init_size(200, 100)
  },
}


</script>

<style scoped>
.sl.header{
  display:	grid;

  grid-template-columns:	1fr;
  grid-template-rows:	1fr;

  place-items:	center;

  width: fit-content;
  height: fit-content;

  position: absolute;
  user-select: none;
}

.ui.header{
  margin:0;
  padding:0;
}

.on_text_edit {
	cursor:		text;
	border:		2px solid lightblue;
	
	background:	#ffeb6b;
}

</style>
