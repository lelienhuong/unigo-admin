<template>
  <div v-loading="formLoading" class="app-container">
    <el-form ref="formCreateRef" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="form.description" type="textarea" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Address" prop="categoryId">
        <el-input v-model="form.address" autocomplete="new-password" />
      </el-form-item>
      <div style="text-align: right">
        <el-button type="secondary" size="mini" @click="clearForm">
          Cancel
        </el-button>
        <el-button type="primary" size="mini" @click="createOne">
          Submit
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import dev from '@/utils/dev'
import { schoolService } from '@/services/school'
import { defineComponent, ref } from '@vue/composition-api'
import router from '@/router'
export default defineComponent({
  setup() {
    const formCreateRef = ref(null)
    const formRules = {
      name: [
        { required: true, message: 'This field is required' }
      ],
      description: [],
      address:[]
    }
    const formOriginal = {
      name: null,
      description: null,
      address:null
    }
    const form = ref(formOriginal)
    const formLoading = ref(false)

    const createOne = async() => {
      try {
        if (await formCreateRef.value.validate()) {
          formLoading.value = true
          const normalizedForm = JSON.parse(JSON.stringify(form.value))
          Object.keys(normalizedForm).forEach(key => {
            if (!normalizedForm[key]) delete normalizedForm[key]
          })
          await schoolService.createOne(form.value)
          router.push({
            name: 'schools-index'
          })
        }
      } catch (err) {
        dev.error(err)
      } finally {
        formLoading.value = false
      }
    }

    const clearForm = () => {
      form.value = formOriginal
      formCreateRef.value.resetFields()
    }

    return { form, formLoading, formCreateRef, formRules, clearForm, createOne }
  },
  mounted() {
    this.formCreateRef = this.$refs.formCreateRef
  }
})
</script>
