<template>
  <div class="ItemsListComponent">
    <BRow class="ItemsListComponent__row">
      <!-- TODO: could happen through a prop to be more functional -->
      <BCol
        :md="isFavouriteList ? '12' : '6'"
        class="ItemsListComponent__search-input"
      >
        <BFormInput
          placeholder="Search for a product"
          @input="debounceInput"
        />
      </BCol>
    </BRow>
    <BRow
      v-if="isSortingEnabled"
      class="ItemsListComponent__row"
    >
      <BCol
        md="6"
      >
        <label>
          <strong>Sort By</strong>
        </label>
        <BFormRadioGroup
          v-model="sortBy"
          class="ItemsListComponent__sort-item"
          :options="sortOptions"
          value-field="value"
          text-field="value"
          @change="setInitialPage"
        />
      </BCol>
      <BCol
        md="6"
      >
        <label>
          <strong>Sort Direction</strong>
        </label>
        <BFormRadioGroup
          v-model="sortDirection"
          :options="sortDirectionOptions"
          value-field="value"
          text-field="value"
          @change="setInitialPage"
        />
      </BCol>
    </BRow>
    <BRow
      v-if="isPaginationEnabled"
      class="ItemsListComponent__row"
    >
      <BCol md="8">
        <BButton
          squared
          variant="outline-secondary"
          class="ItemsListComponent__previous-button"
          :disabled="isPreviousPageButtonHidden"
          @click="onClickPreviousPageButton"
        >
          Previous Page
        </BButton>
        <BButton
          squared
          variant="outline-secondary"
          :disabled="isNextPageButtonHidden"
          @click="onClickNextPageButton"
        >
          Next Page
        </BButton>
      </BCol>
      <BCol
        md="4"
        class="ItemsListComponent__current-page"
      >
        <span>{{ currentPage }} / {{ pagesSize }}</span>
      </BCol>
    </BRow>
    <BRow class="ItemsListComponent__row">
      <BCol
        v-for="item in isFavouriteList ? favouriteList : itemsByListType"
        :key="item.title"
        md="3"
      >
        <ItemComponent
          :title="item.title"
          :description="item.description"
          :price="item.price"
          :email="item.email"
          :image="item.image"
          :is-favorite="item.isFavorite"
          :on-favorite-item="() =>onClickFavoriteItem(item.title)"
          :is-unlike-enabled="isFavouriteList"
        />
      </BCol>
      <BCol
        v-if="isListEmpty"
        cols="12"
      >
        No results found
      </BCol>
    </BRow>
  </div>
</template>
<script>
import {
  DELAY,
  INITIAL_PAGE,
  SEARCH_FIELDS_ARRAY,
  ITEM_FIELDS,
  SORT_DIRECTIONS,
  VUEX_MODULES,
} from '@/constants';

import { debounce } from 'lodash';

import { mapGetters, mapActions, mapState } from 'vuex';

import {
  BButton,
  BCol,
  BFormRadioGroup,
  BFormInput,
  BRow,
  VBModal,
} from 'bootstrap-vue';

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
    };
  },
  computed: {
    ...mapGetters(VUEX_MODULES.ItemsListModule, ['getItemsByFilters']),
    ...mapState(VUEX_MODULES.ItemsListModule, {
      isItemsListLoaded: (state) => state.isLoaded,
    }),
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
    itemsByListType() {
      return this.isPaginationEnabled ? this.paginatedItems : this.filteredItems;
    },
    isPreviousPageButtonHidden() {
      return this.currentPage === 1;
    },
    isNextPageButtonHidden() {
      return this.pagesSize === this.currentPage;
    },
    filteredItems() {
      return this.getItemsByFilters({
        text: this.searchText,
        searchableFields: this.searchableFields,
        sortBy: this.sortBy,
        sortDirection: this.sortDirection,
      });
    },
    isListEmpty() {
      return this.isFavouriteList ? !this.favouriteList.length : !this.itemsByListType.length;
    },
  },
  created() {
    this.sortItems = SEARCH_FIELDS_ARRAY;
  },
  async mounted() {
    if (!this.isItemsListLoaded) {
      await this.getItems();
    }
  },
  methods: {
    ...mapActions(VUEX_MODULES.ItemsListModule, ['toggleFavoriteItem', 'getItems']),
    onClickNextPageButton() {
      this.currentPage += 1;
    },
    onClickPreviousPageButton() {
      this.currentPage -= 1;
    },
    onClickFavoriteItem(title) {
      this.toggleFavoriteItem(title);
    },
    setInitialPage() {
      this.currentPage = INITIAL_PAGE;
    },
    debounceInput: debounce(function debounceInput(text) {
      this.setInitialPage();
      this.searchText = text;
    }, DELAY),
  },
};
</script>
<style lang="scss" scoped>
  @import './ItemsListComponent';
</style>
