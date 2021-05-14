<template>
  <div v-loading="formLoading" class="app-container">
    <el-form :model="form" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.fullName" />
      </el-form-item>
      <el-form-item label="Phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
      <el-form-item label="Address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="Birthday">
        <el-date-picker v-model="form.birthday" type="date" placeholder="Pick a date" />
      </el-form-item>
      <el-form-item label="Bio">
        <el-input v-model="form.bio" type="textarea" />
      </el-form-item>
      <el-form-item label="Avatar">
        <el-input v-model="form.avatar" />
      </el-form-item>
      <div style="text-align: right">
        <el-button type="secondary" size="mini">
          Cancel
        </el-button>
        <el-button type="primary" size="mini">
          Update
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { userService } from '@/services/user'
import dev from '@/utils/dev'
export default {
  data() {
    return {
      form: {
        fullName: null,
        phone: null,
        password: null,
        address: null,
        birthday: null,
        bio: null,
        avatar: null
      },
      formLoading: false
    }
  },
  created() {
    this.fetchOne(this.$route.params.id)
  },
  methods: {
    async fetchOne(id) {
      try {
        this.formLoading = true
        const { data } = await userService.getOne(id)
        this.form = data
      } catch (err) {
        dev.error(err)
      } finally {
        this.formLoading = false
      }
    }
  }
}
</script>
