<template>
  <div class="ItemComponent">
    <div class="ItemComponent__image-wrapper">
      <img
        v-if="image"
        v-lazy="image"
        :alt="title"
        :title="title"
        class="ItemComponent__image"
        onerror="this.style.display='none'"
      >
    </div>
    <h4 v-if="title">
      {{ title }}
    </h4>
    <p
      v-if="description"
      class="ItemComponent__description"
    >
      {{ description }}
    </p>
    <p v-if="price">
      {{ price }}
    </p>
    <a
      v-if="email"
      class="ItemComponent__email"
      :href="`mailto:${email}`"
    >
      {{ email }}
    </a>
    <BButton
      :variant="isFavorite ? 'success' : 'light'"
      @click="(!isFavorite || isUnlikeEnabled) && onFavoriteItem()"
    >
      {{ isFavorite ? dislikeText : 'Like' }}
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
    isUnlikeEnabled: {
      type: Boolean,
      default: false,
    },
    onFavoriteItem: {
      type: Function,
      default: () => ({}),
    },
  },
  computed: {
    dislikeText() {
      return this.isUnlikeEnabled ? 'Dislike' : 'Liked';
    },
  },
};
</script>
<style lang="scss" scoped>
 @import './ItemComponent';
</style>
