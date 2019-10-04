<template>
  <div id="productDetail">
    <div class="spin-content" v-if="loading">
      <a-spin size="large" />
    </div>
    <div class="container"  v-if="!loading">
          <a-row class="title">
      <a-col :span="12">
        <span class="tip">产品详情</span>
      </a-col>
    </a-row>
    <section class="form">
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">产品名称: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip name">{{product.name}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip">修图要求: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip note">{{product.retouch_require}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip">样片素材: </span>
        </a-col>
        <a-col :span="22">
          <a-row>
            <a-col class="pictureWrap" :span="6" v-for="(item, index) in detail.pictrue" :key="index">
              <img :src="item">
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">修图标准: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip name">{{product.retouch_standard}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">权重等级: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip name">{{detail.level}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">模版占位: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip name">{{product.need_template}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">需要拼接: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip name">{{product.need_splicing}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip">非拼接收益: </span>
        </a-col>
        <a-col :span="20">
          <ul class="profit">
            <li v-for="(item, index) in 20" :key="index">
              <span class="head">{{`${item}人`}}</span><span>{{item}}</span>
            </li>
          </ul>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip">拼接收益: </span>
        </a-col>
        <a-col :span="20">
          <ul class="profit">
            <li v-for="(item, index) in 20" :key="index">
              <span class="head">{{`${item}人`}}</span><span>{{item}}</span>
            </li>
          </ul>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip">备注: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip note">{{product.remark}}</p>
        </a-col>
      </a-row>
    </section>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  data() {
    return {
      loading: false,
      product: {},
      detail: {
        pictrue: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
      }
    }
  },
  methods: {
    reviewProduct() {
      this.loading = true
      Api.product.detail({
        orderNum: this.$route.params.id
      }).then((res) => {
        this.product = res.msg
        console.log(this.product)
      }).finally(() => {
        this.loading = false
      })
    }
  },
  created() {
    this.reviewProduct()
  }
}
</script>
<style lang="less">
@import './style/productDetail.less';
</style>