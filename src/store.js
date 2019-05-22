import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        currentScrollValue: 0
    },
    mutations: {
        storeValue (state, payload) {
            state.currentScrollValue = payload.scrollValue;
        }
    }
})