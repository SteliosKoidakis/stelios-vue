<template>
  <BContainer class="DashboardView">
    <BRow class="DashboardView__row">
      <BCol class="DashboardView__favorite-button">
        <BButton @click="$bvModal.show('favorite-items')">
          Should Favorite List
        </BButton>
        <BModal
          id="favorite-items"
          title="Favorite items"
          size="xl"
          hide-backdrop
          ok-only
        >
          <ItemsListComponent
            :is-sorting-enabled="false"
            :is-pagination-enabled="false"
            is-favourite-list
          />
        </BModal>
      </BCol>
    </BRow>
    <BRow class="DashboardView__row">
      <BCol>
        <ItemsListComponent />
      </BCol>
    </BRow>
  </BContainer>
</template>

<script>
import {
  BButton, BContainer, BCol, BModal, BRow,
} from 'bootstrap-vue';

import { ItemsListComponent } from '@/components';

export default {
  name: 'DashboardView',
  components: {
    BButton,
    BContainer,
    BCol,
    BModal,
    BRow,
    ItemsListComponent,
  },
};
</script>

<style lang="scss" scoped>
  @import './DashboardView';
</style>
