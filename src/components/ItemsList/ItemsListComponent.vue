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
        <div>Sort {{ items.length }}</div>
      </BCol>
    </BRow>
    <BRow>
      <BCol>
        <div>Liste items</div>
      </BCol>
    </BRow>
  </div>
</template>
<script>
import { mapState } from 'vuex';
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
  },
};
</script>
