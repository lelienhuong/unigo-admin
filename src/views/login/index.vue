<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="email"
          name="email"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="warning" style="width:100%; margin-bottom:30px;" @click.native.prevent="handleLogin">
        Login
      </el-button>

    </el-form>
  </div>
</template>

<script>
import { authActions } from '@/store/auth/enums'
import dev from '@/utils/dev'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'Login',
  data() {
    return {
      loginForm: {
        email: null,
        password: null
      },
      loginRules: {
        email: [{ required: true, trigger: 'change', min: 6, max: 255 }],
        password: [{ required: true, trigger: 'change', min: 6, max: 255 }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            this.loading = true
            await this.$store.dispatch(authActions.LOGIN, this.loginForm)
            this.$router.push({ path: this.redirect || '/' })
          } catch (err) {
            dev.error(err)
          } finally {
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  }
})
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: white;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &::selection {
        background-color: var(--color-red);
        color: white;
      }

    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 236, 65, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: var(--color-yellow);
  }

  .el-form-item__error {
    color: var(--color-yellow);
    font-weight: bold;
  }
}
</style>

<style lang="scss" scoped>
$bg: #262672;//rgb(75, 75, 214);//rgba(11, 102, 191, 1);
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: var(--color-yellow);
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #E6A23C;//$light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: var(--color-yellow);
    cursor: pointer;
    user-select: none;
  }
}
</style>
