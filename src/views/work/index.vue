<template>
  <div id='work'>
    <section class='content'>
      <!-- 照片上传 -->
      <div class="upload">
        <h4><span class="line"></span><span>发布照片</span></h4>
        <a-alert v-if="visible" message="温馨提示" description="1、若要进行照片拼接，需选择标签对照片标记；如标签“拼接A”先后标记了照片1、2，则表示这两张照片需先后被拼接在一起" type="info" closable :afterClose="handleClose" :style="{textAlign: 'left', marginBottom: '24px'}" />
        <Upload ref="uploadChild" @sendPhotos="getPhotos" />
      </div>
      <div class="order-info">
        <h4><span class="line"></span><span>订单信息</span></h4>
        <a-row>
          <a-col :span="24" class="child-item">
            <span class="title">订单标题: </span>
            <a-input placeholder="请输入订单标题" style="width: 80%;" v-model="orderInfo.title" />
          </a-col>
        </a-row>
      </div>
      <div class="order-info">
        <h4><span class="line"></span><span>修图要求</span></h4>
        <a-row class="child-item">
          <span class="title">眼睛增幅: </span>
          <a-radio-group v-model="orderInfo.claim.eyes">
            <a-radio :value="'big'">大</a-radio>
            <a-radio :value="'middle'">中</a-radio>
            <a-radio :value="'small'">小</a-radio>
            <a-radio :value="'not_required'">无</a-radio>
          </a-radio-group>
        </a-row>
        <a-row class="child-item">
          <span class="title">瘦脸幅度: </span>
          <a-radio-group v-model="orderInfo.claim.face">
            <a-radio :value="'big'">大</a-radio>
            <a-radio :value="'middle'">中</a-radio>
            <a-radio :value="'small'">小</a-radio>
            <a-radio :value="'not_required'">无</a-radio>
          </a-radio-group>
        </a-row>
        <a-row class="child-item">
          <span class="title">是否祛痣: </span>
          <a-radio-group v-model="orderInfo.claim.pimples">
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-row>
        <a-row class="child-item">
          <a-col :span="24">
            <span class="title">修图备注: </span>
            <a-input placeholder="请输入修图备注" style="width: 80%;" v-model="orderInfo.retouchNote" />
          </a-col>
        </a-row>
      </div>
      <div class="order-info">
        <h4><span class="line"></span><span>取片日期</span></h4>
        <a-row class="child-item">
          <a-radio-group v-model="orderInfo.takeTime" :style="{ width: '100%' }">
            <a-radio :value="'today'">当日取片</a-radio>
            <a-radio :value="'tomorrow'">隔日取片</a-radio>
            <a-radio :value="'other_day'">择日取片</a-radio>
          </a-radio-group>
        </a-row>
      </div>
    </section>
    <section class="footer">
      <a-button type="primary" @click="submitCloud">提交云端</a-button>
    </section>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import Upload from "./components/Upload.vue"
export default {
  name: 'work',
  data() {
    return {
      photoList: [],
      submit: false,
      visible: true,
      orderInfo: {
        title: '',
        retouchNote: '',
        takeTime: '',
        claim: {
          eyes: 0,
          face: 0,
          pimples: ''
        }
      }
    }
  },
  computed: {
    params() {
      return {
        title: this.orderInfo.title,
        retouchNote: this.orderInfo.retouchNote,
        takeTime: this.orderInfo.takeTime,
        photoData: this.photoList,
        retouchClaim: {
          eye: this.orderInfo.claim.eyes,
          face: this.orderInfo.claim.face,
          pimples: this.orderInfo.claim.pimples
        }
      }
    }
  },
  components: {
    Upload
  },
  methods: {
    handleClose() {
      this.visible = false
    },
    getPhotos(photos) {
      this.photoList = []
      photos.map((item) => {
        this.photoList.push({
          productId: item.product_id + '',
          path: item.response.url.replace(/\/(\S*)\//, ''),
          peopleNum: Number(item.people_num),
          spliceMark: item.splice_mark,
          splicePosition: item.splice_position,
          type: Boolean(item.splice_position) === true ? 'splice' : 'normal'
        })
      })
    },
    emptyParams() {
      for (let item in this.params) {
        if (!this.params[item]) { return false }
      }
      return true
    },
    async submitCloud() {
      this.$refs.uploadChild.getChildPhotos()
      // TODO: 后续增补Verification模块
      if (!this.emptyParams()) { return this.$message.error("请填写完整信息") }
      this.$emit('loading', true)
      Api.work.add(this.params).then(() => {
        this.$message.success('订单提交成功', 2, () => {
          this.$refs.uploadChild.imgList = []
          this.orderInfo = {
            title: '',
            retouchNote: '',
            takeTime: '',
            claim: {
              eyes: 0,
              face: 0,
              pimples: ''
            }
          }
        })
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.$emit('loading', false)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import './style/index.less';
</style>