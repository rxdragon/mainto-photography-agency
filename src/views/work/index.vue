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
                                        <a-icon type="eye" />
                                    </i>
                                    <i class="anticon anticon-delete" @click="deletePicture(item, index)">
                                        <a-icon type="delete" />
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
                                <a-input-number tyle="width: 40%; margin-left: 4%;" :min="1" :max="99" v-model="splitIndex" placeholder="拼接序号" />
                            </p>
                        </li>
                    </ul>
                    <a-upload :action="uploadConfig.address" listType="picture-card" @change="handleChange" :showUploadList="false">
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
            uploadConfig: {
                address: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
            }
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