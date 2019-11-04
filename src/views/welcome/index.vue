<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <div class="img-wrap">
        <img :src="logo">
      </div>
      <p>云端拍摄中心</p>
      <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="validForm">
        <a-form-item>
          <a-input @change="e => username = e.target.value" v-decorator="rules.userName" placeholder="请输入登录账号">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input @change="e => password = e.target.value" v-decorator="rules.password" type="password" placeholder="请输入登录密码">
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-item>
        <button ref="TencentCaptcha" id="TencentCaptcha" :data-appid="captchaId" data-cbfn="callback" type="button" style="display: none;"></button>
        <a-button type="primary" html-type="submit" class="login-button">登 录</a-button>
      </a-form>
      <div class="loading-wrap" v-if="loading">
        <a-spin tip="登录中..."></a-spin>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      logo: require("@/assets/img/single-logo.png"),
      captchaId: '2049380082',
      username: 'PHTOTOGRAPHER',
      password: null,
      rules: {
        userName: ['userName', { rules: [{ required: true, message: '账号不能为空!' }] }],
        password: ['password', { rules: [{ required: true, message: '密码不能为空!' }] }]
      },
      form: null,
      loading: false
    }
  },
  methods: {
    ...mapActions(['setUserInfo', 'initUpyun']),
    // 验证表单
    validForm(e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) { this.$refs.TencentCaptcha.click() }
      })
    },
    getAuthLogin(captcha) {
      const params = {
        username: this.username,
        password: this.password,
        ...captcha
      }
      this.loading = true
      Api.user.loginAuth(params, {
        headers: { 'X-Expose-Headers': 'X-Stream-Id, x-stream-id' }
      }).then(() => {
        this.$router.replace({path: '/'})
        Api.user.getInfo().then((res) => {
          this.initUpyun()
          this.setUserInfo(res.msg)
        }).catch((e) => {
          this.$message.error(e.data.error_msg)
        })
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    }
  },
  mounted() {
    this.form = this.$form.createForm(this)
    window.callback = res => {
      if (res.ret === 0) {
        this.getAuthLogin({
          ticket: res.ticket,
          randStr: res.randstr
        })
      }
    }
  }
}
</script>
<style lang="less">
@import './style/index.less';
</style>