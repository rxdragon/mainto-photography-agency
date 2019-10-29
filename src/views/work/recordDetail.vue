<template>
  <div id='recordDetail'>
    <div class="spin-content" v-if="loading">
      <a-spin size="large" />
    </div>
    <div class="container" v-if="!loading">
      <section class='content'>
        <div class="orderInfo">
          <h4><span class="line"></span><span>订单信息</span></h4>
          <a-row class="item">
            <a-col :span="12">
              <span>订单标题: </span>
              <p class="text">{{order.title}}</p>
            </a-col>
            <a-col :span="10">
              <span>订单产品: </span>
              <p class="text">{{order.products.join('、')}}</p>
            </a-col>
          </a-row>
          <a-row class="item">
            <span class="head">修图备注:</span>
            <p class="text">{{order.retouch_note}}</p>
          </a-row>
        </div>
        <div class="pictureInfo">
          <h4><span class="line"></span><span>照片信息</span></h4>
          <ul>
            <li v-for="(item, index) in order.streams" :key="index">
              <div class="alert-wrap">
                <a-alert :message="item.product" type="info" />
              </div>
              <a-row type="flex" justify="start" class="pirtureWrap" v-for="(childItem, childIndex) in item.photos" :key="childIndex">
                <a-col :span="6" class="item" v-for="(photoItem, photoIndex) in childItem" :key="photoIndex">
                  <img :src="`${photoHost}${photoItem.path}`">
                </a-col>
              </a-row>
            </li>
          </ul>
        </div>
      </section>
      <section class="footer">
      </section>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'workRecord',
  data() {
    return {
      order: {},
      photoHost: 'https://fed.dev.hzmantu.com/',
      loading: true
    }
  },
  methods: {
    reviewOrder() {
      Api.work.detail({
        orderNum: this.$route.params.id
      }).then((res) => {
        this.order = res.msg
      }).finally(() => {
        this.loading = false
      })
    }
  },
  created() {
    this.reviewOrder()
  }
}
</script>
<style lang="less">
@import './style/recordDetail.less';
</style>