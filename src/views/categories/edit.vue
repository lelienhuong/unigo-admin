<template>
  <div v-loading="formLoading" class="app-container">
    <el-form ref="formUpdateRef" :model="form" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Icon type">
        <el-input v-model="form.iconType" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Icon name">
        <el-input v-model="form.iconName" autocomplete="new-password" />
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
import { categoryService } from '@/services/category'
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'
import router from '@/router'
export default defineComponent({
  setup() {
    const route = router.history.current

    const formUpdateRef = ref(null)
    const formOriginal = {
      name: null,
      description: null,
      iconType: null,
      iconName: null
    }
    const form = ref(formOriginal)
    const formLoading = ref(false)

    const fetchOne = async(slug) => {
      try {
        formLoading.value = true
        const { data } = await categoryService.getOne(slug)
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
        if (formUpdateRef.validate()) {
          formLoading.value = true
          const normalizedForm = JSON.parse(JSON.stringify(form.value))
          Object.keys(normalizedForm).forEach(key => {
            if (!normalizedForm[key]) delete normalizedForm[key]
          })
          await categoryService.updateOne(route.params.slug, form)
          await fetchOne(route.params.slug)
        }
      } catch (err) {
        dev.error(err)
      } finally {
        formLoading.value = false
      }
    }

    const clearForm = () => {
      form.value = formOriginal
      formUpdateRef.resetFields()
    }

    onBeforeMount(() => {
      fetchOne(route.params.slug)
    })

    return { form, formLoading, clearForm, fetchOne, updateOne }
  }
})
</script>
