import ItemsListModule from '@/components/ItemsList/ItemsListModule';
import { VUEX_MODULES } from '@/constants';

export default {
  namespaced: true,
  modules: {
    [VUEX_MODULES.ItemsListModule]: ItemsListModule,
  },
};
