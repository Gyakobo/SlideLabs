<template>
  <div class="slide_components_tree">
    <div class="item">
      <span>
        Соотношение сторон
      </span>

      <select
          :value="project_settings.aspect_ratio_wh"
          @change="update_project_settings('aspect_ratio_wh', $event.target.value)"
      >
        <option v-for="option in aspect_ratio_wh_options" :key="option.text" :value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>

    <div class="item">
      <button class="ui big teal button" @click="export_to_pdf">
        Export to PDF
      </button>
    </div>
    <div class="item">
      <button class="ui big teal button" @click="export_to_html">
        Export to HTML
      </button>
    </div>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js'

export default {
  data (){
    return {
      aspect_ratio_wh_options: [
        { text: '4:3', value: 4/3 },
        { text: '16:9', value: 16/9 },
        { text: '2:1', value: 2 }
      ]
    }
  },
  computed:{
    current_project(){
      return this.$store.state.presentation.current_project
    },
    project_settings(){
      return this.current_project.settings
    }
  },
  methods:{
    update_project_settings(key, value){
      this.project_settings[key] = value
      this.$store.dispatch('update_current_project')
    },
    generate_pdf(element){
      let width = element.children[0].clientWidth
      let height = element.children[0].clientHeight

      let opt = {
        filename:     'presentation.pdf',
        image :       {type : 'jpeg', quality: 1},
        enableLinks: true,
        html2canvas:  {scale: 2},
        jsPDF:        {unit: 'px', format: [width+289, height+152], orientation: 'l'}
      };
      html2pdf().set(opt).from(element).toContainer().toCanvas().toImg().toPdf().save();
    },
    export_to_pdf(){
      let el = this.$store.state.components_tree_root_element
      this.generate_pdf(el)
    },
    export_to_html(){
      let project_id = this.current_project.project_id
      this.$store.dispatch('export_project_to_html', {project_id:project_id})
    }
  }
}
</script>

<style scoped>
.slide_components_tree{
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background: #eee;
  color: var(--black);

  font-size: 20px;

  padding: 5px 10px;
}

.item{
  margin: 5px;
}

</style>
