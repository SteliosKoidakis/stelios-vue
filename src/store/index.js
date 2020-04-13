import ItemsListModule from '@/components/ItemsList/store/ItemsListModule';
import { VUEX_MODULES } from '@/constants';

export default {
  namespaced: true,
  modules: {
    [VUEX_MODULES.ItemsListModule]: ItemsListModule,
  },
};
