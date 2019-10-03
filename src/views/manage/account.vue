<template>
  <div id="account">
    <a-row class="title">
      <a-col :span="12">
        <span class="tip">添加子账号</span>
      </a-col>
      <a-col :span="12" style="text-align: right">
        <a-button type="primary" @click="routeBack">返回</a-button>
      </a-col>
    </a-row>
    <a-row class="form">
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">账号: </span>
        </a-col>
        <a-col :span="6">
          <a-input addonBefore="DC:" placeholder="请填写账号" />
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">登录密码: </span>
        </a-col>
        <a-col :span="6">
          <a-input placeholder="未有特殊密码要求可用填写" />
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">账号昵称: </span>
        </a-col>
        <a-col :span="6">
          <a-input placeholder="请填写昵称" />
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="6" :offset="2">
          <a-button type="primary">提 交</a-button>
        </a-col>
      </a-row>
    </a-row>
  </div>
</template>
<script>
export default {
  name: 'addAccount',
  data() {
    return {}
  },
  methods: {},
  created() {}
}
</script>
<style lang="less">
@import './style/account.less';
</style>