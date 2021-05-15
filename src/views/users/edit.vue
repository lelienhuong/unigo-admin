<template>
  <div v-loading="formLoading" class="app-container">
    <el-form ref="formUpdateRef" :model="form" label-width="120px">
      <el-form-item label="Avatar">
        <el-image :src="form.avatar" fit="cover" style="width: 100px; height: 100px" />
        <el-input v-model="form.avatar" />
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="form.fullName" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Phone">
        <el-input v-model="form.phone" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="form.password" autocomplete="new-password" show-password />
      </el-form-item>
      <el-form-item label="Address">
        <el-input v-model="form.address" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Birthday">
        <el-date-picker v-model="form.birthday" type="date" placeholder="Pick a date" />
      </el-form-item>
      <el-form-item label="Bio">
        <el-input v-model="form.bio" type="textarea" />
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
import { userService } from '@/services/user'
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'
import router from '@/router'
export default defineComponent({
  setup() {
    const route = router.history.current

    const formUpdateRef = ref(null)
    const formOriginal = {
      fullName: null,
      phone: null,
      password: null,
      address: null,
      birthday: null,
      bio: null,
      avatar: null
    }
    const form = ref(formOriginal)
    const formLoading = ref(false)

    const fetchOne = async(id) => {
      try {
        formLoading.value = true
        const { data } = await userService.getOne(id)
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
          await userService.updateOne(route.params.id, form)
          await fetchOne(route.params.id)
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
      fetchOne(route.params.id)
    })

    return { form, formLoading, clearForm, fetchOne, updateOne }
  }
})
</script>
