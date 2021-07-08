import { createWebHistory, createRouter } from "vue-router";

//import page_frame from '@/components/page_frame'
const app_frame = () => import('@/components/app_frame/app_frame')

const file_manager = () => import('@/components/file_manager/file_manager')
const presentation_editor = () => import('@/components/presentation_editor/presentation_editor')

export default createRouter({
  history: createWebHistory(),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
  routes: [
    // {
    //   path:'*',
    //   component:not_found_404,
    // },
    {
      name:'app_frame',
      path:'/',
      component: app_frame,
      redirect:'presentation_editor',
      children:[
        {
          path: 'file_manager',
          name: 'file_manager',
          component: file_manager,
        },
        {
          path: 'presentation_editor',
          name: 'presentation_editor',
          component: presentation_editor,
        },
      ]
    }
  ]
})
