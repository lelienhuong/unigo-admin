<template>
  <div v-loading="formLoading" class="app-container">
    <el-form ref="formCreateRef" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Phone">
        <el-input v-model="form.phone" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="Name Tag">
        <el-input v-model="form.nameTag" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Floor">
        <el-input v-model="form.floorNumber" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Sector ID">
        <el-input v-model="form.sectorId" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Category ID">
        <el-input v-model="form.categoryId" autocomplete="new-password" />
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
import { placeService } from '@/services/place'
import { defineComponent, ref } from '@vue/composition-api'
import router from '@/router'
export default defineComponent({
  setup() {
    const formCreateRef = ref(null)
    const formRules = {
      name: [
        { required: true, message: 'This field is required' }
      ],
      sectorId: [
        { required: true, message: 'This field is required' }
      ],
      categoryId: [
        { required: true, message: 'This field is required' }
      ],
      nameTag: [],
      description: [],
      phone: [],
      floorNumber: [],
    }
    const formOriginal = {
      name: null,
      phone: null,
      description: null,
      floorNumber: null,
      sectorId:null,
      categoryId:null,
      nameTag: null
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
          await placeService.createOne(form.value)
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
