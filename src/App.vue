<template>
  <BContainer>
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld
      class="app__test"
      msg="Welcome to Your Vue.js App"
    />
    <BButton variant="success">
      Test
    </BButton>
  </BContainer>
</template>

<script>
import HelloWorld from '@/components/HelloWorld';
import { BButton, BContainer } from 'bootstrap-vue';

export default {
  name: 'App',
  components: {
    BButton,
    BContainer,
    HelloWorld,
  },
};
</script>

<style lang="scss" scoped>
  @import './App';
</style>
