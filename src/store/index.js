import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {
  DEDICATIONS_URL,
  LOGIN_URL,
  LOGOUT_URL,
  PROJECTS_URL,
} from "@/constants/authUrlConstants.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dedications: [],
    projects: [],
    user: null,
  },
  mutations: {
    setDedications(state, payload) {
      state.dedications = payload;
    },
    setProjects(state, payload) {
      state.projects = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    updateDedications(state, { index, newData }) {
      state.dedications[index] = newData;
    },
  },
  actions: {
    async createDedication({commit, state}, dedication) {
      try {
        const response = await axios.post(DEDICATIONS_URL,
          {
            project_id: dedication.project_id,
            week_number: dedication.week_number,
            pct_dedication: dedication.pct_dedication
          },
          {
            headers: {
              Authorization: state.user.token,
            },
          }
        );
        if (response.status === 200) {
          return true
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteDedication({ commit, state }, dedication) {
      try {
        const response = await axios.delete(`${DEDICATIONS_URL}/${dedication.id}`,
          {
            headers: {
              Authorization: state.user.token,
            },
          }
        );
        if (response.status === 201) {
          let dedications = [...state.dedications]
          dedications = dedications.filter(item => item.id !== dedication.id)
          console.log(dedications)
          commit("setDedications", dedications);
          return true
        }
      } catch (error) {
        console.error(error);
      }
    },
    async editDedication({ commit, state }, dedication) {
      try {
        const response = await axios.patch(
          `${DEDICATIONS_URL}/${dedication.id}`,
          {
            project_id: dedication.project_id,
            week_number: dedication.week_number,
            pct_dedication: dedication.pct_dedication
          },
          {
            headers: {
              Authorization: state.user.token,
            },
          }
        );
        if (response.status === 200) {
          let updatedDedicationIndex = state.dedications.findIndex(item => item.id === dedication.id)
          commit("updateDedications", {
            index: updatedDedicationIndex,
            newData: response.data
          });
        }
        return true
      } catch (error) {
        console.error(error);
      }
    },
    async getDedications({ commit, state }) {
      try {
        const response = await axios.get(DEDICATIONS_URL, {
          headers: {
            Authorization: state.user.token,
          },
        });
        if (response.status === 200) {
          commit("setDedications", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getProjects({ commit, state }) {
      try {
        const response = await axios.get(PROJECTS_URL, {
          headers: {
            Authorization: state.user.token,
          },
        });
        if (response.status === 200) {
          commit("setProjects", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async loginUser({ commit }, { email, password }) {
      try {
        const response = await axios.post(LOGIN_URL, {
          email,
          password,
        });
        if (response.status === 200) {
          window.localStorage.setItem(
            "project-manager-user",
            JSON.stringify(response.data)
          );
          commit("setUser", response.data);
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async logout({ state }) {
      try {
        const response = await axios.post(LOGOUT_URL, {
          headers: {
            Authorization: state.user.token,
          },
        });
        console.log(response);
        if (response.status === 200) {
          commit("setUser", response.data);
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});
