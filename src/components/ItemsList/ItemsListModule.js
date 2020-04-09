import axios from 'axios';

import { checkSearchResultByType } from '@/utils';

import { isArray } from 'lodash';

export default {
  namespaced: true,
  state: {
    items: [],
  },
  mutations: {
    setItems(state, items) {
      if (!isArray(items)) {
        state.items = [];
        return;
      }
      state.items = items;
    },
  },
  getters: {
    // todo: searchableFields as part of store state check
    itemsBySearchText: (state) => (text, searchableFields) => state.items.filter((item) => checkSearchResultByType(item, text, searchableFields)),
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
