<template>
  <a-layout-header :style="style">
    <section>
      <a-icon type="google" />
      云端拍摄中心
    </section>
    <section :style="{ textAlign: 'right' }">
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
      selectedKeys: [],
      openKeys: [],
      style: { color: '#fff', background: '#273159', position: 'fixed', zIndex: '999', width: '100%' }
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