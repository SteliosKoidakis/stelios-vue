<template>
  <div>
    <BRow>
      <BCol cols="6">
        <BFormInput
          v-model="searchText"
          placeholder="Enter your name"
        />
      </BCol>

      <BCol
        v-if="isSortingEnabled"
        cols="6"
      >
        <BFormRadioGroup
          v-model="sortBy"
          :options="sortOptions"
          class="mb-3"
          value-field="value"
          text-field="value"
        />
      </BCol>
      <BCol
        v-if="isSortingEnabled"
        cols="6"
      >
        <BFormRadioGroup
          v-model="sortDirection"
          :options="sortDirectionOptions"
          class="mb-3"
          value-field="value"
          text-field="value"
        />
      </BCol>
    </BRow>
    <BRow v-if="isPaginationEnabled">
      <BCol>
        <BButton
          :disabled="hidePreviousPageButton"
          @click="onClickPreviousPageButton"
        >
          Previous Page
        </BButton>
        <BButton
          :disabled="hideNextPageButton"
          @click="onClickNextPageButton"
        >
          Next Page
        </BButton>
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
    <BRow v-if="isPaginationEnabled">
      <BCol>
        <span>{{ currentPage }} / {{ pagesSize }}</span>
      </BCol>
    </BRow>
  </div>
</template>
<script>
import {
  INITIAL_PAGE, SEARCH_FIELDS_ARRAY, ITEM_FIELDS, SORT_DIRECTIONS,
} from '@/constants';

import { mapGetters } from 'vuex';

import {
  BButton,
  BCol,
  BFormRadioGroup,
  BFormInput,
  BRow,
  VBModal,
} from 'bootstrap-vue';

export default {
  name: 'ItemsListComponent',
  components: {
    BButton,
    BCol,
    BFormRadioGroup,
    BFormInput,
    BRow,
  },
  directives: {
    VBModal,
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
    isPaginationEnabled: {
      type: Boolean,
      default: true,
    },
    itemsPerPage: {
      type: Number,
      default: 5,
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
      currentPage: INITIAL_PAGE,
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
    pagesSize() {
      // todo: to be tested ,this exception
      if (!this.filteredItems.length) {
        return INITIAL_PAGE;
      }
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    paginatedItems() {
      const firstPaginatedItem = (this.currentPage - 1) * this.itemsPerPage;
      const lastPaginatedItem = firstPaginatedItem + this.itemsPerPage;

      return this.filteredItems.slice(firstPaginatedItem, lastPaginatedItem);
    },
    finalItems() {
      return this.isPaginationEnabled ? this.paginatedItems : this.filteredItems;
    },
    hidePreviousPageButton() {
      return this.currentPage === 1;
    },
    hideNextPageButton() {
      return this.pagesSize === this.currentPage;
    },
  },
  watch: {
    // todo: to be tested
    searchText() {
      this.currentPage = 1;
    },
  },
  created() {
    this.sortItems = SEARCH_FIELDS_ARRAY;
  },
  methods: {
    onClickNextPageButton() {
      this.currentPage += 1;
    },
    onClickPreviousPageButton() {
      this.currentPage -= 1;
    },
  },
};
</script>
