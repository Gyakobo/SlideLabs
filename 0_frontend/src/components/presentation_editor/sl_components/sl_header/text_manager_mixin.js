export default {
  computed:{
    project_style(){
      return this.$store.state.presentation_editor.current_project.style
    },
    slide_w_px(){
      return this.$store.state.presentation_editor.slide_w_px
    },
    tm_params(){
      return this.components_tree_item.params.text
    },

    text_value(){
      return this.tm_params.value
    },

    font_size_v(){
      return this.project_style.sl_header_font_size * this.slide_w_px * this.tm_params.font_size
    },
    line_height(){
      return (this.font_size_v * this.tm_params.line_height) + 'px'
    },
    letter_spacing(){
      return this.tm_params.letter_spacing + 'em'
    },
    text_style(){
      return {
        fontSize: this.font_size_v + 'px',
        lineHeight: this.line_height,
        letterSpacing: this.letter_spacing,
        textAlign:this.tm_params.text_align,
      }
    }
  },
  methods:{
    on_text_change(event){
      this.tm_params.value = event.target.value
    },
  }
}