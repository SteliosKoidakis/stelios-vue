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
        v-for="item in isFavouriteList ? favouriteList : finalItems"
        :key="item.title"
        md="4"
        class="d-flex pb-4"
      >
        <ItemComponent
          :title="item.title"
          :description="item.description"
          :price="item.price"
          :email="item.email"
          :image="item.image"
          :is-favorite="item.isFavorite"
          :on-favorite-item="() =>onClickFavoriteItem(item.title)"
        />
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
import { debounce } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import {
  BButton,
  BCol,
  BFormRadioGroup,
  BFormInput,
  BRow,
  VBModal,
} from 'bootstrap-vue';

import {
  DELAY,
  INITIAL_PAGE,
  SEARCH_FIELDS_ARRAY,
  ITEM_FIELDS,
  SORT_DIRECTIONS,
  VUEX_MODULES,
} from '@/constants';

import ItemComponent from './components/Item/ItemComponent';

export default {
  name: 'ItemsListComponent',
  components: {
    BButton,
    BCol,
    BFormRadioGroup,
    BFormInput,
    BRow,
    ItemComponent,
  },
  directives: {
    VBModal,
  },
  props: {
    isFavouriteList: {
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
      sortBy: ITEM_FIELDS.title,
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
      filteredItems: [],
    };
  },
  computed: {
    ...mapGetters(VUEX_MODULES.ItemsListModule, ['getItemsByFilters']),
    pagesSize() {
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
    favouriteList() {
      return this.filteredItems.filter((item) => item.isFavorite);
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
    searchText() {
      this.currentPage = 1;
      this.getFilteredItems();
    },
    searchableFields() {
      this.getFilteredItems();
    },
    sortBy() {
      this.getFilteredItems();
    },
    sortDirection() {
      this.getFilteredItems();
    },
  },
  created() {
    this.sortItems = SEARCH_FIELDS_ARRAY;
  },
  mounted() {
    this.getFilteredItems();
  },
  methods: {
    ...mapActions(VUEX_MODULES.ItemsListModule, ['toggleFavoriteItem']),
    onClickNextPageButton() {
      this.currentPage += 1;
    },
    onClickPreviousPageButton() {
      this.currentPage -= 1;
    },
    getFilteredItems: debounce(function debouncegetFilteredItems() {
      this.filteredItems = this.getItemsByFilters({
        text: this.searchText,
        searchableFields: this.searchableFields,
        sortBy: this.sortBy,
        sortDirection: this.sortDirection,
      });
    }, DELAY),
    onClickFavoriteItem(title) {
      this.toggleFavoriteItem(title);
      this.getFilteredItems();
    },
  },
};
</script>
