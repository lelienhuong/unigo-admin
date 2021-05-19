<template>
  <div v-loading="formLoading" class="app-container">
    <el-form ref="formCreateRef" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Phone" prop="phone">
        <el-input v-model="form.phone" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Size" prop="size">
        <el-input v-model="form.size" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="form.description" type="textarea" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Category ID" prop="categoryId">
        <el-input v-model="form.categoryId" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="School ID" prop="schoolId">
        <el-input v-model="form.schoolId" autocomplete="new-password" /> 
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
import { sectorService } from '@/services/sector'
import { defineComponent, ref } from '@vue/composition-api'
import router from '@/router'
export default defineComponent({
  setup() {
    const formCreateRef = ref(null)
    const formRules = {
      name: [
        { required: true, message: 'This field is required' }
      ],
      phone:[],
      size:[],
      description: [],
      schoolId:[],
      categoryId:[]
    }
    const formOriginal = {
      name: null,
      phone: null,
      size: null,
      description: null,
      schoolId:null,
      categoryId:null
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
          await sectorService.createOne(form.value)
          router.push({
            name: 'sectors-index'
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
