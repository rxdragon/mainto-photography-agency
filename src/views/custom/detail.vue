<template>
  <div id='customDetail'>
    <h3>客片详情</h3>
    <section class='content'>
      <div class="orderInfo">
        <h4><span class="line"></span><span>订单信息</span></h4>
        <ul>
          <li>
            <p class="head">订单标题</p>
            <p>标题内容</p>
          </li>
          <li>
            <a-row>
              <a-col :span="12">
                <p class="head">拍摄产品</p>
                <p>精致证件照正身-蓝底、仙女照-单人-西芙-四宫格</p>
              </a-col>
              <a-col :span="12">
                <p class="head">上传人</p>
                <p class="iconLine"><span></span>大葱摄影师</p>
              </a-col>
            </a-row>
          </li>
          <li>
            <p class="head">修图备注</p>
            <p>修图备注修图备注</p>
          </li>
        </ul>
      </div>
      <div class="pictureInfo">
        <h4><span class="line"></span><span>照片信息</span></h4>
        <ul>
          <li v-for="(item, index) in pictures" :key="index">
            <p class="head">{{item.product}}</p>
            <a-row type="flex" justify="start" class="pirtureWrap">
              <a-col :span="6" class="item" v-for="(childItem, childIndex) in item.list" :key="childIndex">
                <img :src="childItem">
                <p class="tip">
                  <span class="mask"></span>
                  <span class="text">原片</span>
                </p>
              </a-col>
            </a-row>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'custom',
  data() {
    return {
      pictures: [{
        product: '证件照',
        list: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
      }, {
        product: '签证照',
        list: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
      }]
    }
  },
  methods: {},
  created() {}
}
</script>
<style lang="less">
@import './style/detail.less';
</style>