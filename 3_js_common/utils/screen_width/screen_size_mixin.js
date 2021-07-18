import screen_width_settings from "./screen_width_settings";

export default {
  data(){
    return {
      SCREEN_TYPES: screen_width_settings.SCREEN_TYPES,
      SCREEN_SIZES: screen_width_settings.SCREEN_SIZES,
      screen_width:0
    }
  },
  methods: {
    calc_screen_type(){
      var w = this.screen_width

      if (w < this.SCREEN_SIZES.SMALL_TO_MEDIUM){
        return this.SCREEN_TYPES.SMALL
      }else if(w < this.SCREEN_SIZES.MEDIUM_TO_BIG){
        return this.SCREEN_TYPES.MEDIUM
      }else{
        return this.SCREEN_TYPES.BIG
      }
    },
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    on_resize() {
      let w = window.innerWidth

      this.$store.state.screen_width = w
      this.screen_width = w
      this.$store.state.screen_type = this.calc_screen_type()
    },
  },

  mounted() {
    this.on_resize()

    this.$nextTick(() => {
      window.addEventListener('resize', this.on_resize);
    })
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.on_resize);
  },

}
