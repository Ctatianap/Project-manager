import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { LOGIN_URL, LOGOUT_URL } from "@/constants/authUrlConstants.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    projects: [],
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async loginUser({ commit }, { email, password }) {
      try {
        const response = await axios.post(LOGIN_URL, {
          email,
          password,
        });
        if (response.status === 200) {
          window.localStorage.setItem('project-manager-user', JSON.stringify(response.data))
          commit("setUser", response.data);
          return true;
        }
      } catch (error) {
        return false;
      }
    },
    async logout({ state }) {
      try {
        console.log(state.user.token)
        const response = await axios.post(
          LOGOUT_URL,
          {
            headers: {
              Authorization: 'Token ' + state.user.token,
            },
          }
        );
        console.log(response);
        // if (response.status === 200) {
        //   commit('setUser', response.data)
        //   return true
        // }
      } catch (error) {
        return false;
      }
    },
  },
});
