<template>
  <a-layout-header :style="{ color: '#fff', background: '#273159', position: 'fixed', zIndex: '999', width: '100%'}">
    <section>
      <a-icon type="google" />
      云端拍摄中心
    </section>
    <section :style="{ textAlign: 'right' }">
      <span>{{getUser.job}}</span>
      <a-tag color="blue" class="organization">{{getUser.name}}</a-tag>
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
      selectedKeys: [],
      openKeys: [],
    }
  },
  computed: {
    ...mapGetters([
      'getUser',
    ])
  }
}
</script>
<style scoped lang="less">
section {
  display: inline-block;
  width: 50%;

  .organization {
    margin: auto 20px;
  }
}
</style>