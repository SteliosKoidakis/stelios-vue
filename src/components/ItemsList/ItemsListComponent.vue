<template>
  <div>
    <BRow>
      <BCol>
        <BFormInput
          v-model="searchText"
          placeholder="Enter your name"
        />
      </BCol>
      <BCol>
        <div>Sort {{ finalItems.length }}</div>
      </BCol>
    </BRow>
    <BRow>
      <BCol
        v-for="item in finalItems"
        :key="item.title"
        cols="3"
      >
        <div>{{ item.title }}</div>
        <div>{{ item.description }}</div>
        <div>{{ item.price }}</div>
        <div>{{ item.email }}</div>
        <div>{{ item.image }}</div>
      </BCol>
    </BRow>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import { BRow, BCol, BFormInput } from 'bootstrap-vue';
import { SEARCH_FIELDS_ARRAY } from '@/constants';

export default {
  name: 'ItemsListComponent',
  components: {
    BCol,
    BFormInput,
    BRow,
  },
  props: {
    isFavourite: {
      type: Boolean,
      default: false,
    },
    searchableFields: {
      type: Array,
      default: () => SEARCH_FIELDS_ARRAY,
    },
    isSortingEnabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchText: '',
      sortingOptions: {

      },
    };
  },
  computed: {
    ...mapState('ItemsListModule', {
      items: (state) => state.items,
    }),
    ...mapGetters('ItemsListModule', ['itemsBySearchText']),
    filteredItems() {
      return this.itemsBySearchText(this.searchText, this.searchableFields);
    },
    finalItems() {
      return this.searchText ? this.filteredItems : this.items;
    },
  },
};
</script>
