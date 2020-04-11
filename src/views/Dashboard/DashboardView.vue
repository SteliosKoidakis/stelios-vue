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
import { VUEX_MODULES } from '@/constants';

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
  async created() {
    await this.getItems();
  },
  methods: {
    ...mapActions(VUEX_MODULES.ItemsListModule, ['getItems']),
  },
};
</script>
