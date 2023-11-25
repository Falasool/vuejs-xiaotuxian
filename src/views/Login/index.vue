<script setup>
import { ref } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
// 表单校验-step1:准备表单对象
const form = ref({
  account: '',
  password: '',
  // 是否勾选协议
  agree: true
})
// 表单校验-step3:准备规则对象
const rules = {
  // 用户名：必填、不合法时返回的内容、触发条件：失焦
  account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  // 密码：
  password: [
    // 规则一：密码：必填、6-14字符、不合法时返回的内容、触发条件：失焦
    { required: true, message: '密码不能为空', trigger: 'blur' },
    // 规则二：6-14字符、不合法时返回的内容、触发条件：失焦
    { min: 6, max: 14, message: '密码6-14字符', trigger: 'blur' }
  ],
  // 自定义校验规则
  // 必须同意用户协议
  agree: [
    {
      validator: (rule, value, callback) => {
        // rule：自定义校验逻辑
        // value：当前输入的数据(input)
        // callback：校验处理函数(通过/否决) 校验通过调用
        console.log(value)
        if (value) {
          callback()
        } else {
          callback(new Error('请同意用户协议'))
        }
      }
    }
  ]
}

// 统一校验-获取form实例
const formRef = ref(null)
const router = useRouter()
const doLogin = () => {
  const { account, password } = form.value
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    // valid：所有表单通过校验时为true
    console.log(valid)
    if (valid) {
      // Login
      await userStore.getUserInfo({ account, password })
      // 成功后：1.提示用户 2.跳转到首页
      ElMessage({
        type: 'success',
        message: 'success login'
      })
      router.replace({ path: '/' })
      // 登录失败：用http.js的拦截器做统一控制
    }
  })
}

// 从 @/apis/user 中导入 loginAPI 函数。
// 定义 formRef，这是一个 Vue ref，用于在 Vue 组件中存储对表单的引用。
// 定义 doLogin 函数，用于处理登录逻辑。
// doLogin 函数中，首先从 form.value 中解构出 account 和 password。
// 调用 formRef.value.validate 方法来校验表单。这个方法接收一个回调函数，该回调函数标记为 async 表明它是异步的。
// 在回调函数内，首先检查表单校验是否通过（valid 是否为 true）。
// 如果通过，使用 await 关键字调用 loginAPI 函数，并等待登录操作完成。由于 loginAPI 是异步的，await 确保登录操作完成后再继续执行。
// 通过使用 async 和 await，这段代码以接近同步代码的方式处理异步逻辑，使得代码更易读、更易维护。
</script>

<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>

    <!-- *************** -->
    <!-- 业务区域：表单校验 -->
    <!-- *************** -->
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <!-- 表单校验-step2:绑定表单对象 -->
            <!-- 表单校验-step4:绑定规则对象 -->
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="right"
              label-width="60px"
              status-icon
            >
              <!-- 表单校验-step5:指定校验的字段名 -->
              <el-form-item prop="account" label="账户">
                <!-- 表单校验-step6: 双向绑定表单对象-->
                <el-input v-model="form.account" />
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" />
              </el-form-item>
              <!-- 指定校验字段 -->
              <el-form-item prop="agree" label-width="22px">
                <!-- 双向绑定数据 -->
                <el-checkbox v-model="agree" size="large"> 我已同意隐私条款和服务条款 </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
