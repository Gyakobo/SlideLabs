export default {
  data(){
    return {
      interval_handle:null,
      tmp_value:''
    }
  },
  computed:{
    project_style(){
      return this.$store.state.presentation.current_project.style
    },
    slide_w_px(){
      return this.$store.state.presentation.slide_w_px
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
    update_tmp_value(){
      this.tmp_value = this.$refs.text.innerText
    },
    edit_text() {
      if (!this.$store.state.presentation.is_editable){
        return false
      }

      this.$refs.text.style.cursor = 'text';
      this.$refs.text.contentEditable = true;
      this.$refs.text.focus();
      this.edit_text_flag = true;

      this.interval_handle = setInterval(() => {
        this.update_tmp_value()
      }, 1000)
    },
    quit_edit_text() {
      this.$refs.text.contentEditable = false
      this.edit_text_flag = false;

      clearInterval(this.interval_handle)
      this.update_tmp_value()
      this.tm_params.value = this.tmp_value
    },
  }
}