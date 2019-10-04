<template>
  <div id='recordDetail'>
    <div class="spin-content" v-if="loading">
      <a-spin size="large" />
    </div>
    <div class="container" v-if="!loading">
      <h3>拍摄详情</h3>
      <section class='content'>
        <div class="orderInfo">
          <h4><span class="line"></span><span>订单信息</span></h4>
          <ul>
            <li>
              <p class="head">订单标题</p>
              <p>{{order.title}}</p>
            </li>
            <li>
              <p class="head">拍摄产品</p>
              <p>{{order.products.join('、') }}</p>
            </li>
            <li>
              <p class="head">修图备注</p>
              <p>{{order.retouch_note}}</p>
            </li>
          </ul>
        </div>
        <div class="pictureInfo">
          <h4><span class="line"></span><span>照片信息</span></h4>
          <ul>
            <li v-for="(item, index) in order.streams" :key="index">
              <p class="head">{{item.product}}</p>
              <a-row type="flex" justify="start" class="pirtureWrap">
                <a-col :span="8" class="item" v-for="(childItem, childIndex) in item.photos" :key="childIndex">
                  <img :src="childItem.path">
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