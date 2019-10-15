<template>
  <div id='customDetail'>
    <div class="spin-content" v-if="loading">
      <a-spin size="large" />
    </div>
    <div class="contaner" v-else>
      <h3>客片详情</h3>
      <section class='content'>
        <div class="orderInfo">
          <h4><span class="line"></span><span>订单信息</span></h4>
          <ul>
            <li>
              <p class="head">订单标题</p>
              <p>{{order.title}}</p>
            </li>
            <li>
              <a-row>
                <a-col :span="12">
                  <p class="head">拍摄产品</p>
                  <p>{{order.products.join('、') }}</p>
                </a-col>
                <a-col :span="12">
                  <p class="head">上传人</p>
                  <p class="iconLine"><span></span>{{order.photographer}}</p>
                </a-col>
              </a-row>
            </li>
            <li>
              <p class="head">修图备注</p>
              <p>{{order.retouch_note}}</p>
            </li>
          </ul>
        </div>
        <div class="pictureInfo">
          <h4>
            <span class="line"></span><span>订单信息</span>
          </h4>
          <ul>
            <li v-for="(item, index) in order.streams" :key="index">
              <p class="head">{{item.product}}</p>
              <a-row type="flex" justify="start" class="pirtureWrap">
                <a-col :span="8" class="item" v-for="(childItem, childIndex) in item.photos" :key="childIndex">
                  <img :src="childItem.path">
                  <p class="tip">
                    <span class="mask"></span>
                    <span class="text">{{versionState[childItem.version]}}</span>
                  </p>
                </a-col>
              </a-row>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'custom',
  data() {
    return {
      loading: false,
      versionState: {
        first_photo: '原片',
        complete_photo: '云端成片'
      }
    }
  },
  methods: {
    reviewOrder() {
      this.loading = true
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
@import './style/detail.less';
</style>