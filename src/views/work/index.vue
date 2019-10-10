<template>
  <div id='work'>
    <h3>拍摄上传</h3>
    <p class="tip-text">
      温馨提示:
      <br />
      * 若要进行照片拼接，需选择标签对照片标记；如标签“拼接A”先后标记了照片1、2，则表示这两张照片需先后被拼接在一起
    </p>
    <section class='content'>
      <!-- 照片上传 -->
      <div class="upload">
        <h4><span class="line"></span><span>上传照片</span></h4>
        <Upload />
      </div>
      <div class="order-info">
        <h4><span class="line"></span><span>订单信息</span></h4>
        <div class="card">
          <ul class='head-title'>
            <li>订单标题</li>
          </ul>
          <p class="content">
            <a-input v-model="orderInfo.title" placeholder="请输入订单标题" />
          </p>
        </div>
      </div>
      <div class="order-info">
        <h4><span class="line"></span><span>修图要求</span></h4>
        <div class="card">
          <ul class='head-title'>
            <li>眼睛增幅</li>
            <li>瘦脸幅度</li>
            <li>是否祛痣</li>
          </ul>
          <p class="content">
            <ul>
              <li>
                <a-radio-group v-model="orderInfo.claim.eyes">
                  <a-radio :value="'bigger'">大</a-radio>
                  <a-radio :value="'middle'">中</a-radio>
                  <a-radio :value="'small'">小</a-radio>
                  <a-radio :value="4">无</a-radio>
                </a-radio-group>
              </li>
              <li>
                <a-radio-group v-model="orderInfo.claim.face">
                  <a-radio :value="'bigger'">大</a-radio>
                  <a-radio :value="'middle'">中</a-radio>
                  <a-radio :value="'small'">小</a-radio>
                  <a-radio :value="4">无</a-radio>
                </a-radio-group>
              </li>
              <li>
                <a-radio-group v-model="orderInfo.claim.pimples">
                  <a-radio :value="true">是</a-radio>
                  <a-radio :value="false">否</a-radio>
                </a-radio-group>
              </li>
            </ul>
          </p>
        </div>
        <div class="card">
          <ul class='head-title'>
            <li>修图备注</li>
          </ul>
          <p class="content">
            <a-input v-model="orderInfo.retouchNote" placeholder="请输入修片备注" />
          </p>
        </div>
      </div>
      <div class="order-info">
        <h4><span class="line"></span><span>取片日期</span></h4>
        <div class="card">
          <ul class='head-title'>
            <li>取片时间</li>
          </ul>
          <p class="content">
            <ul>
              <li>
                <a-radio-group v-model="orderInfo.takeTime" :style="{ width: '100%' }">
                  <a-radio :value="'today'" :style="{ width: '30%' }">当日取片</a-radio>
                  <a-radio :value="'other_day'" :style="{ width: '30%' }">隔日取片</a-radio>
                  <a-radio :value="'the_day'" :style="{ width: '30%' }">择日取片</a-radio>
                </a-radio-group>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </section>
    <section class="footer">
      <a-button type="primary">提交至缦图云端</a-button>
    </section>
  </div>
</template>
<script>
import Upload from "./components/Upload.vue"
export default {
  name: 'work',
  data() {
    return {
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
  components: {
    Upload
  },
  methods: {}
}
</script>
<style lang="less">
@import './style/index.less';
</style>