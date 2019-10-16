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
        <a-button type="primary" @click="createZip">一键 下载</a-button>
      </section>
    </div>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import JsZip from 'jszip'
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
  computed: {
    photoQueue() {
      let list = []
      if (!this.order.streams.length) { return list }
      this.order.streams.map((item) => {
        let itemList = item.photos
        itemList.map((item) => {
          list.push(item.path)
        })
      })
      return list
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
    },
    createZip() {
      let zip = new JsZip()
      let fold = zip.folder('下载')
      this.photoQueue.map((obj) => {
        zip.file('file.png', obj);
      })
      zip.generateAsync({
        type: 'blob'
      }).then(function(content) {
        var filename = 'test.zip';
        // 创建隐藏的可下载链接
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 下载内容转变成blob地址
        eleLink.href = URL.createObjectURL(content);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
      });
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