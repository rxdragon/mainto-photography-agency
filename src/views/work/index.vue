<template>
  <div id="work">
    <section class="content">
      <!-- 照片上传 -->
      <div class="upload">
        <h4><span class="line" /><span>发布照片</span></h4>
        <a-alert v-if="visible" message="温馨提示" description="1、若要进行照片拼接，需选择标签对照片标记；如标签“拼接A”先后标记了照片1、2，则表示这两张照片需先后被拼接在一起" type="info" closable :after-close="handleClose" :style="{textAlign: 'left', marginBottom: '24px'}" />
        <Upload ref="uploadChild" @loading="sendLoding" @sendPhotos="getPhotos" />
      </div>
      <div class="order-info">
        <h4><span class="line" /><span>订单信息</span></h4>
        <a-row>
          <a-col :span="24" class="child-item">
            <span class="title">顾客姓名: </span>
            <a-input v-model="orderInfo.name" placeholder="请输入顾客姓名" style="width: 80%;" />
          </a-col>
          <a-col :span="24" class="child-item">
            <span class="title">订单标题: </span>
            <a-input v-model="orderInfo.title" placeholder="请输入订单标题" style="width: 80%;" />
          </a-col>
        </a-row>
      </div>
      <div class="order-info">
        <h4><span class="line" /><span>修图要求</span></h4>
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
            <a-input v-model="orderInfo.retouchNote" placeholder="请输入修图备注" style="width: 80%;" />
          </a-col>
        </a-row>
      </div>
      <div class="order-info">
        <h4><span class="line" /><span>取片日期</span></h4>
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
import Upload from './components/Upload.vue'
import * as PhotoTool from '@/util/photoTool'

export default {
  name: 'Work',
  components: { Upload },
  data () {
    return {
      photoList: [],
      submit: false,
      visible: true,
      orderInfo: {
        title: '',
        name: '',
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
    params () {
      return {
        title: this.orderInfo.title,
        customerName: this.orderInfo.name,
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
  methods: {
    handleClose () {
      this.visible = false
    },
    getPhotos (photos) {
      this.photoList = []
      photos.map((item) => {
        this.photoList.push({
          productId: item.product_id && item.product_id + '',
          path: PhotoTool.handlePicPath(item.response.url),
          peopleNum: String(item.people_num),
          spliceMark: item.splice_mark,
          splicePosition: item.splice_position,
          type: Boolean(item.splice_position) === true ? 'splice' : 'normal'
        })
      })
    },
    /**
     * @description 验证参数
     */
    emptyParams () {
      for (const item in this.params) {
        if (!this.params[item]) return false
      }
      if (!this.params.retouchClaim.eye) return false
      if (!this.params.retouchClaim.face) return false
      const hasPimples = typeof this.params.retouchClaim.pimples === 'boolean'
      if (!hasPimples) return false
      for (const photo of this.params.photoData) {
        if (!Number(photo.peopleNum) && Number(photo.peopleNum) !== 0) { return false }
        if (!photo.productId || !photo.peopleNum) { return false }
      }
      return true
    },
    async submitCloud () {
      const isAllFinish = this.$refs.uploadChild.getChildPhotos()
      if (!isAllFinish) return
      // TODO: 后续增补Verification模块
      if (!this.emptyParams()) { return this.$message.error('请填写完整信息') }
      this.$emit('loading', true)
      Api.work.add(this.params).then(() => {
        this.$message.success('订单提交成功', 2, () => {
          this.$refs.uploadChild.fileList = []
          this.orderInfo = {
            title: '',
            name: '',
            retouchNote: '',
            takeTime: '',
            claim: {
              eyes: 0,
              face: 0,
              pimples: ''
            }
          }
          this.$emit('loading', false)
        })
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
        this.$emit('loading', false)
      })
    },
    sendLoding (state) {
      this.$emit('loading', state)
    }
  }
}
</script>
<style lang="less" scoped>
@import './style/index.less';
</style>
