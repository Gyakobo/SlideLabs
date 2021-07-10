<template>
	<div
		ref="text"

		:id="components_tree_item.id"
		class="sl header disable_select"
		:class="{active:components_tree_item.is_active, on_text_edit: edit_text_flag}"
		:style="components_tree_item.params.root_element_style"
		
		spellcheck=false

		@pointerdown="set_active_component(components_tree_item, $event)"
		@dblclick="edit_text()"
		@keyup.escape="quit_edit_text()"
		
		@keyup.tab.prevent
		
		@keydown.tab.prevent
	>
		{{ content }}
	</div>
</template>

<script>
import draggable_resizable_component_mixin from "../../../utils/drag_resize/draggable_resizable_component_mixin";
import components_tree_controller_mixin from "../../../utils/components_tree/components_tree_controller_mixin";

let actions = {
  not_active:['drag'],
  active_no_edit:['top', 'bottom', 'left', 'right', 'drag'],
  active_edit:[],
}

export default {
  mixins:[
    draggable_resizable_component_mixin,
    components_tree_controller_mixin
  ],
  data (){
    return {
      edit_text_flag:	false,
      content: 'Example_Text',
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
    edit_text() {
      this.$refs.text.style.cursor = 'text';
      this.$refs.text.contentEditable = true;
      this.$refs.text.focus();
      this.edit_text_flag = true;
    },
    quit_edit_text() {
      this.$refs.text.contentEditable = false
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

.disable_select {
	user-select: none; /* supported by Chrome and Opera */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
}

.sl.header{
	font-size:	150%;
	font-family:	'sans-serif';

	display:	inline-block;

	word-break:	break-all;

	/*display:	grid;
	grid-template-columns:	1fr;
	grid-template-rows:	1fr;
	place-items:	center;*/

	/*width: fit-content;
	height: fit-content;*/

	position: absolute;
	user-select: none;
	
	cursor:		text;
}

.sl.header pre {
	white-space:	pre-wrap;
}

.on_text_edit {
	cursor:		text;
	border:		2px solid lightblue;
	
	background:	#ffeb6b;
}

</style>
