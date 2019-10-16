<template>
  <div id="account">
    <a-row class="form">
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">账号: </span>
        </a-col>
        <a-col :span="6">
          <a-input addonBefore="DC:" placeholder="请填写账号" v-model="account.username" />
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">登录密码: </span>
        </a-col>
        <a-col :span="6">
          <a-input placeholder="未有特殊密码要求可用填写" v-model="account.password" />
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">账号昵称: </span>
        </a-col>
        <a-col :span="6">
          <a-input placeholder="请填写昵称" v-model="account.nick" />
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="6" :offset="2">
          <a-button type="primary" @click="submit">提 交</a-button>
        </a-col>
      </a-row>
    </a-row>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'addAccount',
  data() {
    return {
      account: {
        id: '',
        username: '',
        nick: '',
        password: ''
      }
    }
  },
  computed: {
    hasQuery() {
      return this.$route.query.id !== undefined
    }
  },
  methods: {
    submit() {
      if (!this.hasQuery) {
        Api.manage.create(this.account).then(() => {
          this.$message.success('账号创建成功', 3)
        })
      } else {
        Api.manage.edit(this.account).then(() => {
          this.$message.success('账号修改成功', 3)
        })
      }
    },
  },
  created() {
    if (this.hasQuery) { this.account = this.$route.query }
  }
}
</script>
<style lang="less">
@import './style/account.less';
</style>