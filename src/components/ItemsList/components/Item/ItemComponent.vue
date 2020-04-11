<template>
  <div class="ItemComponent d-flex flex-column">
    <img
      v-if="image"
      :alt="title"
      :title="title"
      :src="image"
      class="rounded img-fluid"
    >
    <div v-if="title">
      {{ title }}
    </div>
    <div
      v-if="description"
      class="flex-grow-1"
    >
      {{ description }}
    </div>
    <div v-if="price">
      {{ price }}
    </div>
    <div v-if="email">
      {{ email }}
    </div>
    <BButton
      :variant="isFavorite ? 'success' : 'light'"
      @click="onFavoriteItem"
    >
      {{ isFavorite ? 'Unlike' : 'Like' }}
    </BButton>
  </div>
</template>
<script>
import { BButton } from 'bootstrap-vue';

export default {
  name: 'ItemComponent',
  components: {
    BButton,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    onFavoriteItem: {
      type: Function,
      default: () => ({}),
    },
  },
};
</script>
<style lang="scss" scoped>
 @import './ItemComponent';
</style>
