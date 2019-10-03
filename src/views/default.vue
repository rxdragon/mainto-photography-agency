<template>
  <div>
    <h1>你好, {{getUser.job}}</h1>
    <p>欢迎登录云端拍摄中心</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Api from '@/api/index.js'
export default {
  name: 'default',
  computed: {
    ...mapGetters([
      'getUser',
    ])
  },
  async created () {
    const result = await Api.product.list()
  },
}
</script>
<style scoped lang="less">
</style>