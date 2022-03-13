<template>
  <div>
    <div id="person_app">
      <el-form ref="userInfo" :model="User" :rules="rules" size="medium" label-width="70px">
        <el-row :gutter="0">
          <el-col :span="24">
            <!-- 用户头像 -->
            <el-form-item label="用户头像" prop="avatar">
              <!-- 头衔缩略图 -->
              <pan-thumb :image="User.avatar"/>
              <!-- 文件上传按钮 -->
              <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
                <!--              <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>-->
              </el-button>

              <!--
                v-show：是否显示上传组件
                :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                :url：后台上传的url地址
                @close：关闭上传组件
                @crop-upload-success：上传成功后的回调 -->
              <!--              <my-upload/>-->
              <image-cropper
                  v-show="imagecropperShow"
                  :withCredentials="true"
                  :width="300"
                  :height="300"
                  :key="imagecropperKey"
                  :url="'/system/AliOss/upload'"
                  field="file"
                  @close="closeImage"
                  @crop-upload-success="cropSuccess"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
           <el-form-item label="学号" prop="username">
             <el-input v-model="User.username" placeholder="请输入学号" clearable class="input">
             </el-input>
           </el-form-item>
            <el-form-item label="学院" prop="collegeId">
              <el-select v-model="User.departmentId" placeholder="请选择学院" clearable
                         class="input">
                <el-option v-for="item in colleges" :key="item.id" :label="item.collegeName"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
           <el-form-item label="密码" prop="password">
             <el-input v-model="User.password" placeholder="请输入密码" clearable class="input">
             </el-input>
           </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="User.sex" size="medium">
                <el-radio v-for="(item, index) in sexOptions" :key="index" :label="item.value"
                          :disabled="item.disabled">{{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" prop="birth">
              <el-date-picker v-model="User.birth"
                              type="date"
                              format="YYYY年MM月DD日"
                              class="input" placeholder="请选择生日" clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="sex">
              <el-radio-group v-model="User.type" size="medium">
                <el-radio v-for="(item, index) in TypeOptions" :key="index" :label="item.value"
                          :disabled="item.disabled">{{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
           <el-form-item label="邮箱" prop="email">
             <el-input v-model="User.email" placeholder="请输入邮箱" clearable class="input">
             </el-input>
           </el-form-item>
            <el-form-item label="电话" prop="phone_number">
              <el-input v-model="User.phone_number" placeholder="请输入电话" clearable
                        class="input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import {deleteAvatar} from "@/api/oss";
import {saveUser, updateUser} from "@/api/users";
import {formatDate} from "@/utils/DateFormat"
import {getUserInfo} from "@/api/login";
import {findColAndCount} from "@/api/depat";

export default {
  inheritAttrs: false,
  components: {
    ImageCropper,
    PanThumb
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: false,
      // 头像相关
      imagecropperShow: false, // 是否显示上传组件
      imagecropperKey: 0, // 上传组件id
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      User: [],
      rules: {
        username: [],
        departmentId: [],
        password: [],
        sex: [],
        type: [],
        email: [],
        phone_number: [],
        birth: [],
      },
      avatarAction: 'https://jsonplaceholder.typicode.com/posts/',
      avatarfileList: [],
      department_idOptions: [],
      colleges: [],
      sexOptions: [{
        "label": "女",
        "value": 0
      }, {
        "label": "男",
        "value": 1
      }, {
        "label": "保密",
        "value": 2
      }],
      TypeOptions: [{
        "label": "教师",
        "value": 2
      }, {
        "label": "学生",
        "value": 1
      }],
    }
  },
  computed: {},
  watch: {
    // 监听show,visible 随着show变化而变化
    show(oldVal, newVal) {
      this.showDialog = this.show
    }
  },
  created() {
    this.getUserInfo()
    this.getColleges()
  },
  mounted() {
  },
  methods: {
    onOpen() {
    },
    onClose() {
      this.$refs['userInfo'].resetFields()
    },
    // close() {
    //   this.$emit('changeShow', false)
    // },
    async getUserInfo() {
      const {data:res} = await getUserInfo()
      console.log(res)
      this.User = res.data.data
    },
    async updateUser() {
      const {data:res} = await updateUser(this.User)
      if(res.code!==200){
        return this.$message.error({
          showClose: true,
          message: res.message,
          center: true,
          duration: 1000
        })
      }
      this.$message.success({
        showClose: true,
        message: res.message,
        center: true,
        duration: 1000
      })
    },
    handelConfirm() {
      this.$refs['userInfo'].validate(valid => {
        // this.getBirthDate(this.User.birth)
        if (!valid) return
        this.updateUser()
        // this.close()
        // this.addUser();
      })
    },
    async getColleges() {
      const {data:res} = await findColAndCount()
      this.colleges = res.data.data
    },
    // getBirthDate(date) {
    //   this.User.birth = formatDate(date, "yyyy-MM-dd")
    //   console.log("date", this.User.birth)
    // },
    // async addUser(){
    //   const {data:res} = await saveUser(this.User)
    //   if(res.code == 200){
    //     this.$notify.success({
    //       title: '操作成功',
    //       message: '用户添加成功'
    //     })
    //     // 关闭
    //     this.$emit('changeShow', false)
    //     this.User={}
    //     // this.$emit('getUsersList')
    //     // this.$emit('getDeptAndCount')
    //   }else{
    //     return this.$message.error('用户添加失败：'+res.message)
    //   }
    // },
    avatarBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      let isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    },
    // 上传成功后的回调函数
    cropSuccess(data) {
      console.log(data)
      var temp = this.image;
      this.imagecropperShow = false
      this.User.avatar = this.image = data.message;
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
      this.deleteAvatar(temp);
    },
    async deleteAvatar(fileURL) {
      const {data} = await deleteAvatar(fileURL);
      console.log(data)
    },
    // 关闭上传组件
    closeImage() {
      this.imagecropperShow = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    }
  },
}

</script>
<style lang="less" scoped>
#person_app {
  width: 100%;
  margin: 50px 50px;
}
.input{
  width: 80%;
}

.el-upload__tip {
  line-height: 1.2;
}

.address {
  height: 40px;
  background-color: white;
  line-height: 40px;
  padding-left: 20px;

  .span {
    padding-left: 5px;
    border-left: #ffd04b 5px solid;
  }
}
</style>
