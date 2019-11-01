<template>
  <div class="full-page">
    <div class="img-wrap">
      <img :src="defaultBg">
      <p>欢迎来到<span class="tip">缦图云端拍摄中心</span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'default',
  data() {
    return {
      defaultBg: require("@/assets/img/default.png"),
    }
  },
}
</script>
<style scoped lang="less">
.full-page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .img-wrap {
    width: 550px;
    margin-top: -70px;

    img {
      width: 100%;
    }

    p {
      width: 100%;
      height: 38px;
      font-size: 30px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(19, 25, 35, 1);
      line-height: 38px;
      text-align: center;

      .tip {
        color: #1769FF;
      }
    }
  }
}
</style>