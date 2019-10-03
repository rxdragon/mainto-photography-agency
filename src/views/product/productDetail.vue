<template>
  <div id="productDetail">
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
          <p class="tip name">{{detail.name}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip">修图要求: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip note">{{detail.note}}</p>
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
          <p class="tip name">{{detail.type}}</p>
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
          <p class="tip name">{{detail.needTemp}}</p>
        </a-col>
      </a-row>
      <a-row class="item">
        <a-col :span="2">
          <span class="tip name">需要拼接: </span>
        </a-col>
        <a-col :span="6">
          <p class="tip name">{{detail.needSplit}}</p>
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
          <p class="tip note">{{detail.note}}</p>
        </a-col>
      </a-row>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detail: {
        name: '花颜照',
        note: '写的特比好',
        type: '蓝标',
        level: '一类产品',
        needTemp: '需要',
        needSplit: '是',
        pictrue: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
      },
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
      data: [{
        title: '1',
      }, {
        title: '2',
      }, {
        title: '3',
      }, {
        title: '4',
      }, {
        title: '5',
      }]
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    }
  }
}
</script>
<style lang="less">
@import './style/productDetail.less';
</style>