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
            <a-col 
              class="pictureWrap"
              :span="6"
              v-for="(item, index) in product.simple_image_url"
              :key="index">
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
          <p class="tip name">{{weightState[product.weight_level]}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">模版占位: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip name">{{product.need_template === 0 ? '不需要' : '需要'}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">需要拼接: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip name">{{product.need_splicing === 0 ? '不需要' : '需要'}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip">非拼接收益: </span>
        </a-col>
        <a-col :span="20">
          <ul class="profit">
            <li v-for="(item, index) in product.normal_income_config" :key="index">
              <span class="head">{{`${index}人`}}</span><span>{{item}}</span>
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
            <li v-for="(item, index) in product.splicing_income_config" :key="index">
              <span class="head">{{`${index}人`}}</span><span>{{item}}</span>
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
      weightState: {
        weight_first: '一类产品',
        weight_second: '二类产品',
        weight_third: '三类产品',
        weight_fourth: '四类产品',
        weight_fifth: '五类产品'
      },
      loading: false,
      product: {}
    }
  },
  methods: {
    reviewProduct() {
      this.loading = true
      Api.product.detail({
        orderNum: this.$route.params.id
      }).then((res) => {
        this.product = res.msg
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