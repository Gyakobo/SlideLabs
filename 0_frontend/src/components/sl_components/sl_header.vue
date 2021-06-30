<template>
  <div :id="id" class="sl header" style="left:100px">
    <h1 @dblclick="EditText($event);" @keydown.enter.prevent @keyup.escape="QuitEditText($event);" @keyup.enter="QuitEditText($event);" spellcheck=false ref="TextElement" style="margin:0; padding:0;" class="ui header TextElement" :class="{ 'normal_tag_name' : editTextFlag }">Example Text</h1>
  </div>
</template>

<script>
export default {
  data (){
    return {
	text:		'Yet another header',
	editTextFlag:	false,
    }
  },
  props:{
    id:{
      type:String,
      required:true,
    }
  },
	methods: {
		EditText(event) {
			const targetID = event.currentTarget;

			targetID.contentEditable = true;
			this.editTextFlag = true;
			
			//targetID.innerHTML = "Works";
		},
		QuitEditText(event) {
			const targetID = event.currentTarget;

			targetID.contentEditable = false;
			this.editTextFlag = false;
			
			//targetID.innerHTML = "Works";
		},
	},
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sl.header{
  width: fit-content;
  height: fit-content;

  position: absolute;
}

.normal_tag_name {
	cursor:		text;
	border:		2px solid lightblue;
	
	background:	#ffeb6b;
}

</style>
