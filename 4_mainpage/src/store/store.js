import {createStore} from 'vuex'

export default createStore({
    state: {
        layout: 'default-layout'
    },
    mutations: {
        setLayout(state, payload) {
            state.layout = payload
        }
    },
    actions: {},
    getters: {
        layout(state) {
            return state.layout
        }
    }
})