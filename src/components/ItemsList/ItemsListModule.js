import axios from 'axios';

import {
  checkSearchResultByType,
  sortNumberByDirection,
  sortStringByDIrection,
} from '@/utils';
import {
  ITEM_FIELDS,
  SORT_DIRECTIONS,
} from '@/constants';

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
    getItemsByFilters: (state) => ({
      text, searchableFields, sortBy, sortDirection,
    }) => {
      const items = state.items.filter((item) => checkSearchResultByType(item, text, searchableFields));
      const isDescSortDirection = sortDirection === SORT_DIRECTIONS.desc;

      return items.sort((currentItem, nextItem) => (sortBy === ITEM_FIELDS.price
        ? sortNumberByDirection(isDescSortDirection, currentItem[sortBy], nextItem[sortBy])
        : sortStringByDIrection(isDescSortDirection, currentItem[sortBy], nextItem[sortBy])));
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
