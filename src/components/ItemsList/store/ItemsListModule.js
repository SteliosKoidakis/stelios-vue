import {
  checkSearchResultByType,
  sortNumber,
  sortString,
  getObjectByDirection,
} from '@/utils';
import {
  ITEM_FIELDS,
  SORT_DIRECTIONS,
  SEARCH_FIELDS_ARRAY,
} from '@/constants';

import Vue from 'vue';

import {
  findIndex, isArray, isNumber, isBoolean,
} from 'lodash';

import axios from 'axios';

export default {
  namespaced: true,
  state: {
    items: [],
    isLoaded: false,
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
    setLoadedStatus(state, value) {
      if (!isBoolean(value)) return;

      state.isLoaded = value;
    },
  },
  getters: {
    getItemsByFilters: (state) => ({
      text = '',
      searchableFields = SEARCH_FIELDS_ARRAY,
      sortBy = SEARCH_FIELDS_ARRAY.title,
      sortDirection = SORT_DIRECTIONS.asc,
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
        commit('setLoadedStatus', true);
      } catch {
        commit('setItems', []);
        commit('setLoadedStatus', false);
      }
    },
    toggleFavoriteItem({ commit, state }, id) {
      const index = findIndex(state.items, (item) => item.title === id);

      commit('toggleFavorite', index);
    },
  },
};
