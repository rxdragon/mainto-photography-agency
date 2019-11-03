<template>
  <div id="account">
    <a-row class="form">
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">账号: </span>
        </a-col>
        <a-col :span="7">
          <a-input :addonBefore="`${getUser.organization.username}: `" placeholder="请填写账号" :value="account.username" :maxLength="16" @change="userChange" />
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">登录密码: </span>
        </a-col>
        <a-col :span="6">
          <a-input type="text" placeholder="未有特殊密码要求可不用填写" :value="account.password" :maxLength="16" @change="passChange">
          </a-input>
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
import { mapGetters } from 'vuex'
import Api from '@/api/index.js'
export default {
  name: 'addAccount',
  data() {
    return {
      value: '',
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
    },
    ...mapGetters([
      'getUser',
    ])
  },
  methods: {
    userChange(e) {
      const { value } = e.target
      const reg = /^[0-9a-zA-Z]*$/g
      if (reg.test(value) || value === '' || value === '-') {
        this.account.username = value
      }
    },
    passChange(e) {
      const { value } = e.target;
      const reg = /^[0-9a-zA-Z]*$/g
      if (reg.test(value) || value === '' || value === '-') {
        this.account.password = value
      }
    },
    submit() {
      if (!this.account.username || !this.account.nick) { return this.$message.error('请填写完整信息') }
      this.$emit('loading', true)
      if (!this.hasQuery) {
        Api.manage.create(this.account).then(() => {
          this.$message.success('账号创建成功', 1, this.routeBack)
        }).catch((e) => {
          this.$message.error(e.data.error_msg)
        }).finally(() => {
          this.$emit('loading', false)
        })
      } else {
        Api.manage.edit(this.account).then(() => {
          this.$message.success('账号修改成功', 1, this.routeBack)
        }).catch((e) => {
          this.$message.error(e.data.error_msg)
        }).finally(() => {
          this.$emit('loading', false)
        })
      }
    },
  },
  created() {
    if (this.hasQuery) { this.account = Object.assign(this.account, this.$route.query) }
  }
}
</script>
<style lang="less">
@import './style/account.less';
</style>