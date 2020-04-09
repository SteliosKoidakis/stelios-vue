<template>
  <BContainer>
    <BRow>
      <BCol>
        <div>FavouritesList</div>
      </BCol>
    </BRow>
    <BRow>
      <BCol>
        <ItemsListComponent />
      </BCol>
    </BRow>
  </BContainer>
</template>
<script>
import { mapActions } from 'vuex';
import { BContainer, BRow, BCol } from 'bootstrap-vue';

import { ItemsListComponent } from '@/components';

export default {
  name: 'DashboardView',
  components: {
    BContainer,
    BCol,
    BRow,
    ItemsListComponent,
  },
  async created() {
    await this.getItems();
  },
  methods: {
    ...mapActions('ItemsListModule', ['getItems']),
  },
};
</script>
