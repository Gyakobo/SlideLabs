import { createWebHistory, createRouter } from "vue-router";

export default  createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
            meta: {
                layout:'auth-layout'
            }
        },
        {
            path: '/registration',
            name: 'registration',
            component: () => import('../views/Registration.vue'),
            meta: {
                layout:'auth-layout'
            }
        }
    ]
})