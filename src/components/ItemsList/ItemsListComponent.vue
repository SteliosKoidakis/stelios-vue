<template>
  <div>
    <BRow>
      <BCol cols="6">
        <BFormInput
          v-model="searchText"
          placeholder="Enter your name"
        />
      </BCol>
      <BCol cols="6">
        <BFormRadioGroup
          v-model="sortBy"
          :options="sortOptions"
          class="mb-3"
          value-field="value"
          text-field="value"
        />
      </BCol>
      <BCol cols="6">
        <BFormRadioGroup
          v-model="sortDirection"
          :options="sortDirectionOptions"
          class="mb-3"
          value-field="value"
          text-field="value"
        />
      </BCol>
    </BRow>
    <BRow>
      <BCol
        v-for="item in filteredItems"
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
import { mapGetters } from 'vuex';
import {
  BRow, BCol, BFormRadioGroup, BFormInput,
} from 'bootstrap-vue';
import { SEARCH_FIELDS_ARRAY, ITEM_FIELDS, SORT_DIRECTIONS } from '@/constants';

export default {
  name: 'ItemsListComponent',
  components: {
    BCol,
    BFormRadioGroup,
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
      sortBy: ITEM_FIELDS.price,
      sortOptions: [
        { value: ITEM_FIELDS.title },
        { value: ITEM_FIELDS.description },
        { value: ITEM_FIELDS.price },
        { value: ITEM_FIELDS.email },
      ],
      sortDirection: SORT_DIRECTIONS.asc,
      sortDirectionOptions: [
        { value: SORT_DIRECTIONS.asc },
        { value: SORT_DIRECTIONS.desc },
      ],
    };
  },
  computed: {
    ...mapGetters('ItemsListModule', ['getItemsByFilters']),
    filteredItems() {
      return this.getItemsByFilters({
        text: this.searchText,
        searchableFields: this.searchableFields,
        sortBy: this.sortBy,
        sortDirection: this.sortDirection,
      });
    },
  },
  created() {
    this.sortItems = SEARCH_FIELDS_ARRAY;
  },
};
</script>
