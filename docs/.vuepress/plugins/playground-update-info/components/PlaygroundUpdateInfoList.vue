<template>
  <div>
    <ul>
      <li v-for="item in updates">
        <div>
          ({{ item.date }}) <router-link :to="item.path">{{ item.title }}</router-link>
        </div>
        <ul v-if="item.description.length > 0">
          <li v-for="line in item.description">
            {{ line }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import data from '@dynamic/playground-update-info/data';

export default {
  data() {
    return {
      updates: data,
    };
  },
};
</script>

<style lang="stylus" scoped>
</style>
