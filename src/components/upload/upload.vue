<template>
  <el-dialog title="上传文件" :visible="updateVisible" :close-on-click-modal='false' :show-close='false'>
    <el-form :model="form">
      <el-form-item label="合作伙伴" :label-width="formLabelWidth">
        <el-select v-model="form.partner" placeholder="请选择合作伙伴">
          <el-option label="180" value="180"></el-option>
          <el-option label="pinyou" value="pinyou"></el-option>
          <el-option label="tdx" value="tdx"></el-option>
        </el-select>
      </el-form-item>
      <div v-show="form.partner">
        <el-form-item label="上传" :label-width="formLabelWidth">
          <div class="example-drag">
            <div class="upload">
              <ul v-if="files.length" style="margin-right: 40px">
                <li v-for="(file, index) in files" :key="file.id">
                  <span>{{file.name}}</span> -
                  <span>{{file.size | formatSize}}</span>
                  <span v-if="file.error">{{file.error}}</span>
                  <span v-else-if="file.success"> - 成功</span>
                  <span v-else-if="file.active"> - 上传中</span>
                  <span v-else></span>
                </li>
              </ul>
              <ul v-else style="margin-right: 40px">
                <div class="text-center" style="border: 1px dashed #bfcbd9;">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或点击<label for="file"><em>选择文件</em></label></div>
                </div>
              </ul>

              <!--<div v-show=" $refs.upload && $refs.upload.dropActive" class="drop-active">
                <h3>将 文 件 上 传</h3>
              </div>-->

              <div class="example-btn" style="text-align: center;margin-bottom: 15px;">
                <file-upload class="btn btn-primary" post-action="api/advpackage/upload" :multiple="true" :drop="true"
                             :drop-directory="true" v-model="files" :data="form" ref="upload">
                  <i class="fa fa-plus"></i>
                  选择文件
                </file-upload>
                <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active"
                        @click.prevent="$refs.upload.active = true">
                  <i class="fa fa-arrow-up" aria-hidden="true"></i>
                  开始上传
                </button>
                <button type="button" class="btn btn-danger" v-else @click.prevent="$refs.upload.active = false">
                  <i class="fa fa-stop" aria-hidden="true"></i>
                  停止上传
                </button>
              </div>
            </div>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!--<el-button @click="updateVisible = false">取 消</el-button>-->
      <el-button type="success" @click="comfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import FileUpload from 'vue-upload-component'

  export default {
    name: 'packageupload',
    components: {
      FileUpload
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        files: [],
        formLabelWidth: '120px',
        form: {
          partner: '180'
        }
      }
    },
    watch: {
      show: function (a) {
        this.dialogFormVisible = true // 只要show改变，就更新dialogFormVisible
      }
    },
    computed: {
      updateVisible: {
        get: function () {
          return this.dialogFormVisible
        },
        set: function (value) {
          this.dialogFormVisible = value
        }
      }
    },
    methods: {
      comfirm() {
        this.updateVisible = false
        this.$emit('advpackagerefresh', 'refresh parent')
      },
      async customAction(file, component) {
        // return await component.uploadPut(file)
        return await component.uploadHtml4(file)
      }
    },
    filters: {
      formatSize(size) {
        if (size > 1024 * 1024 * 1024 * 1024) {
          return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
        } else if (size > 1024 * 1024 * 1024) {
          return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
        } else if (size > 1024 * 1024) {
          return (size / 1024 / 1024).toFixed(2) + ' MB'
        } else if (size > 1024) {
          return (size / 1024).toFixed(2) + ' KB'
        }
        return size.toString() + ' B'
      }
    }
  }
</script>
<style>
  .example-drag {
    border: 1px solid #bfcbd9;
    border-radius: 4px;
  }

  .example-drag label.btn {
    margin-bottom: 0;
    margin-right: 1rem;
  }

  .example-drag .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: .6;
    text-align: center;
    background: #000;
  }

  .example-drag .drop-active h3 {
    margin: -.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 0;
  }

  .btn-primary {
    color: #fff;
    background-color: #4dddc0;
    border-color: #4dddc0;
  }

  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .5rem .75rem;
    font-size: 1rem;
    line-height: 1.25;
    border-radius: .25rem;
    transition: all .15s ease-in-out;
  }

  .el-icon-upload {
    font-size: 67px;
    color: #97a8be;
    margin: 20px 0 16px;
    line-height: 50px;
  }
</style>
