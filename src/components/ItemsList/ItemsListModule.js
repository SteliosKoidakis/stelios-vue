import axios from 'axios';

export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
  },
  actions: {
    async getItems({ commit }) {
      try {
        const { data } = await axios.get(
          'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/items.json',
        );
        commit('setItems', data.items);
      } catch {
        commit('setItems', []);
      }
    },
  },
};
