<template>
	<div>
		<h1>你好, {{getUser.job}}</h1>
		<p>欢迎登录云端拍摄中心</p>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    name: 'default',
    ...mapGetters([
      'getUser',
    ])
  }
}
</script>
<style scoped lang="less">

</style>

