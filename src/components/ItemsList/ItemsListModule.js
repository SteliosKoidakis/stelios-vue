import Vue from 'vue';
import { isArray, isNumber } from 'lodash';
import {
  checkSearchResultByType,
  sortNumber,
  sortString,
  getObjectByDirection,
} from '@/utils';
import {
  ITEM_FIELDS,
  SORT_DIRECTIONS,
} from '@/constants';

import axios from 'axios';

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
    toggleFavorite(state, index) {
      if (!isNumber(index)) {
        return;
      }
      const item = state.items[index];

      const newItem = {
        ...item,
        isFavorite: item && !item.isFavorite,
      };

      Vue.set(state.items, index, newItem);
    },
  },
  getters: {
    // todo: searchableFields as part of store state check
    // todo: put defaults
    getItemsByFilters: (state) => ({
      text, searchableFields, sortBy, sortDirection,
    }) => {
      const items = state.items.filter((item) => checkSearchResultByType(item, text, searchableFields));
      const isDescSortDirection = sortDirection === SORT_DIRECTIONS.desc;

      return items.sort((currentItem, nextItem) => (sortBy === ITEM_FIELDS.price
        ? sortNumber(
          getObjectByDirection({
            isDescSortDirection,
            currentItem: currentItem[sortBy],
            nextItem: nextItem[sortBy],
          }),
        )
        : sortString(
          getObjectByDirection({
            isDescSortDirection,
            currentItem: currentItem[sortBy],
            nextItem: nextItem[sortBy],
          }),
        )
      ));
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
    toggleFavoriteItem({ commit, state }, id) {
      const index = state.items.findIndex((item) => item.title === id);

      commit('toggleFavorite', index);
    },
  },
};
