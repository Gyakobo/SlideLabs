<template>
	<div
		ref="text"

		:id="components_tree_item.id"
		class="sl header disable_select"
		:class="{active:is_active, on_text_edit: edit_text_flag}"
		:style="style"
		
		spellcheck=false

		@pointerdown="set_active_component(components_tree_item, $event)"
		@dblclick="edit_text()"
		@keyup.escape="quit_edit_text()"
		
		@keyup.tab.prevent
		
		@keydown.tab.prevent
	>
		{{ text_value }}
	</div>
</template>

<script>
import draggable_resizable_component_mixin from "../../utils/drag_resize/draggable_resizable_component_mixin";
import text_manager_mixin from "./text_manager_mixin";
import components_tree_controller_mixin from "../../utils/components_tree/components_tree_controller_mixin";

let actions = {
  not_active:['drag'],
  active_no_edit:['left', 'right', 'drag'],
  active_edit:[],
}

export default {
  mixins:[
    draggable_resizable_component_mixin,
    text_manager_mixin,
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
    style(){
      return [
        this.root_element_dr_style,
        this.text_style
      ]
    },
    is_active(){
      if (!this.$store.state.presentation.is_editable){
        return false
      }

      return this.components_tree_item.is_active
    }
  },
  watch:{
    is_active(new_value){
      if(new_value){
        if(this.edit_text_flag){
          this.resizer.set_actions(actions.active_edit)
        }else{
          this.resizer.set_actions(actions.active_no_edit)
        }
      }else{
        this.resizer.set_actions(actions.not_active)
        this.quit_edit_text()
      }
    },
    edit_text_flag(new_value){
      if (!this.is_active){
        return
      }
      if(new_value){
        this.resizer.set_actions(actions.active_edit)
      }else{
        this.resizer.set_actions(actions.active_no_edit)
      }
    }
  },
  methods: {
    initialize_params_if_empty(){
      if (this.components_tree_item.params === null){
        this.components_tree_item.params = {
          drag_resizer:{
            x:0,
            y:0,
            width:0.5,
          },
          text:{
            value:'Header',
            font_size:1,
            line_height:1,
            letter_spacing:0,
            text_align:'left',
          },
        }
      }
    }
  },
  created() {
    this.initialize_params_if_empty()
  },
}


</script>

<style scoped>

img {
}

.disable_select {
	user-select: none; /* supported by Chrome and Opera */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
}

.sl.header{
  position: absolute;
  display:	inline-block;

	word-break:	break-all;
	user-select: none;
	cursor:		text;

  white-space:pre-wrap;
}

.on_text_edit {
	cursor:		text;
	background:	#ffeb6b;
}

</style>
