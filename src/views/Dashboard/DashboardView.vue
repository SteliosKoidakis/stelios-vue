<template>
  <BContainer>
    <BRow>
      <BCol>
        <div>
          <BButton @click="$bvModal.show('favorite-items')">
            Should Favorite List
          </BButton>

          <BModal
            id="favorite-items"
            title="Favorite items"
            hide-backdrop
          >
            <ItemsListComponent
              :is-sorting-enabled="false"
              :is-pagination-enabled="false"
              is-favourite-list
            />
          </BModal>
        </div>
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
  // todo: move this oncreated() of ItemsListComponent ?¿
  async created() {
    await this.getItems();
  },
  methods: {
    ...mapActions('ItemsListModule', ['getItems']),
  },
};
</script>
