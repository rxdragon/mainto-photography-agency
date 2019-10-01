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
                <div class="clearfix">
                    <ul class="ant-upload-list ant-upload-list-picture-card" v-for="(item, index) in imgList" :key="index">
                        <li class="list-wrap">
                            <div class="ant-upload-list-item ant-upload-list-item-done">
                                <div class="ant-upload-list-item-info">
                                    <img :src="item.response.url" style="height: 220px;">
                                </div>
                                <span class="ant-upload-list-item-actions" style="top: 120px">
                                    <i class="anticon anticon-eye-o" @click="previewPicture(item.response.url)">
                                        <svg viewBox="64 64 896 896" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
                                            <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z">
                                            </path>
                                        </svg>
                                    </i>
                                    <i class="anticon anticon-delete" @click="deletePicture(item, index)">
                                        <svg viewBox="64 64 896 896" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
                                            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z">
                                            </path>
                                        </svg>
                                    </i>
                                </span>
                            </div>
                            <p class="picture-name">{{`文件名: ${item.name}`}}</p>
                            <p class="picture-count">
                                选择人数:
                                <a-input-number style="width: 68%;" :min="0" :max="99" v-model="count" :formatter="value => `${value} 人`" :parser="value => value.replace(/\$\s?|(,*)/g, '')" />
                            </p>
                            <p class="picture-product">
                                选择产品:
                                <a-select placeholder="请选择产品类型" v-model="productValue" style="width: 68%" @change="productChange(item)">
                                    <a-select-option value="123">证件照</a-select-option>
                                    <a-select-option value="345">花颜照</a-select-option>
                                    <a-select-option value="456">全家福</a-select-option>
                                </a-select>
                            </p>
                            <p class="picture-product">
                                <a-select placeholder="拼接类型" style="width: 55%" v-model="spliceValue" @change="spliceChange(item)">
                                    <a-select-option v-for="(item, index) in splitArray" :key="index" :value="item">{{item}}</a-select-option>
                                </a-select>
                                <a-input-number style="width: 40%; margin-left: 4%;" :min="1" :max="99" v-model="splitIndex" placeholder="拼接序号" />
                            </p>
                        </li>
                    </ul>
                    <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" @change="handleChange" :showUploadList="false">
                        <div>
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">点击上传</div>
                        </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                </div>
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
                <h4><span class="line"></span><span>修图要求</span></h4>
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
export default {
    name: 'work',
    data() {
        return {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            imgList: [],
            count: 0,
            splitIndex: '',
            splitArray: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            loading: false,
            orderInfo: {
                title: '',
                retouchNote: '',
                takeTime: '',
                claim: {
                    eyes: 0,
                    face: 0,
                    pimples: ''
                }
            },
            productValue: undefined,
            spliceValue: undefined,
        }
    },
    methods: {
        deletePicture(picture, index) {
            this.imgList.splice(index, 1)
        },
        previewPicture(url) {
            this.previewImage = url
            this.previewVisible = true
        },
        productChange(item) {
            item.product_id = this.productValue
        },
        spliceChange(item) {
            item.splice_mark = this.spliceValue
        },
        handleCancel() {
            this.previewVisible = false
        },
        handlePreview(file) {
            this.previewImage = file.url || file.thumbUrl
            this.previewVisible = true
        },
        handleChange({ file, fileList }) {
            this.fileList = fileList
            if (file.status === 'uploading') {
                this.loading = true
            } else if (file.status === 'done') {
                this.imgList.push(Object.assign(file, {
                    people_num: '',
                    splice_mark: '',
                    splice_position: '',
                    product_id: ''
                }))
                this.loading = false
            }
        },
    },
}
</script>
<style lang="less">
@import './style/index.less';
</style>