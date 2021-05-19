<template>
  <div v-loading="formLoading" class="app-container">
    <el-form ref="formUpdateRef" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Phone">
        <el-input v-model="form.phone" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Size">
        <el-input v-model="form.size" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="Category ID">
        <el-input v-model="form.categoryId" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="School ID">
        <el-input v-model="form.schoolId" autocomplete="new-password" />
      </el-form-item>
      <div style="text-align: right">
        <el-button type="secondary" size="mini" @click="clearForm">
          Cancel
        </el-button>
        <el-button type="primary" size="mini" @click="updateOne">
          Update
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import dev from '@/utils/dev'
import { sectorService } from '@/services/sector'
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'
import router from '@/router'
export default defineComponent({
  setup() {
    const route = router.history.current

    const formUpdateRef = ref(null)
    const formRules = {
      name: [
        { required: true, message: 'This field is required' }
      ],
      categoryId: [
        { required: true, message: 'This field is required' }
      ],
      schoolId: [
        { required: true, message: 'This field is required' }
      ],
      size: [],
      description: [],
      phone: [],
    }
    const formOriginal = {
      name: null,
      phone: null,
      description: null,
      size: null,
      categoryId: null,
      schoolId: null,
    }
    const form = ref(formOriginal)
    const formLoading = ref(false)

    const fetchOne = async(id) => {
      try {
        formLoading.value = true
        const { data } = await sectorService.getOne(id)
        Object.keys(form.value).forEach(key => {
          form.value[key] = data[key]
        })
      } catch (err) {
        dev.error(err)
      } finally {
        formLoading.value = false
      }
    }

    const updateOne = async() => {
      try {
        if (formUpdateRef.value.validate()) {
          formLoading.value = true
          const normalizedForm = JSON.parse(JSON.stringify(form.value))
          Object.keys(normalizedForm).forEach(key => {
            if (!normalizedForm[key]) delete normalizedForm[key]
          })
          await sectorService.updateOne(route.params.id, form.value)
          await fetchOne(route.params.id)
        }
      } catch (err) {
        alert(err)
        dev.error(err)
      } finally {
        formLoading.value = false
      }
    }

    const clearForm = () => {
      form.value = formOriginal
      formUpdateRef.value.resetFields()
    }

    onBeforeMount(() => {
      fetchOne(route.params.id)
    })

    return { form, formLoading, formUpdateRef, formRules, clearForm, fetchOne, updateOne }
  },
  mounted() {
    this.formUpdateRef = this.$refs.formUpdateRef
  }
})
</script>
