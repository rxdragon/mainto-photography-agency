<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="triggerCollapsed" />
    <section :style="{ float: 'right', marginRight: '10px'}">
      <span>{{getUser.nick}}</span>
      <a-tag color="blue" class="organization">{{getUser.username}}</a-tag>
      <a-tag color="red">退出</a-tag>
    </section>
  </a-layout-header>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
    ])
  },
  methods: {
    triggerCollapsed () {
      this.collapsed = !this.collapsed
      this.$emit('collapsedEvent', this.collapsed)
    }
  }
}
</script>
<style scoped lang="less">
section {
  height: 64px;

  .organization {
    margin: auto 20px;
  }
}
</style>