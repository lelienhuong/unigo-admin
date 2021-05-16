<template>
  <div v-loading="formLoading" class="app-container">
    <el-form ref="formUpdateRef" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="Label" prop="label">
        <el-input v-model="form.label" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Icon type" prop="iconType">
        <el-select v-model="form.iconType" placeholder="Select an icon type">
          <el-option
            v-for="item in [{ label: 'Font awesome', value: 'fontawesome' }, { label: 'Custom', value: 'custom' }]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Icon class" prop="iconName">
        <el-input v-model="form.iconName" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Color" prop="color">
        <el-color-picker v-model="form.color" />
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
import { tagService } from '@/services/tag'
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'
import router from '@/router'
export default defineComponent({
  name: 'TagEditPage',
  setup() {
    const route = router.history.current

    const formUpdateRef = ref(null)
    const formRules = {
      label: [
        { required: true, message: 'This field is required' }
      ],
      iconType: [],
      iconName: [],
      color: [
        { required: true, message: 'This field is required' }
      ]
    }
    const formOriginal = {
      label: null,
      iconType: null,
      iconName: null,
      color: null
    }
    const form = ref(formOriginal)
    const formLoading = ref(false)

    const fetchOne = async(id) => {
      try {
        formLoading.value = true
        const { data } = await tagService.getOne(id)
        Object.keys(form.value).forEach(key => {
          form.value[key] = data[key]
        })
        form.value.iconType = data.icon.type
        form.value.iconName = data.icon.name
      } catch (err) {
        dev.error(err)
      } finally {
        formLoading.value = false
      }
    }

    const updateOne = async() => {
      try {
        if (await formUpdateRef.value.validate()) {
          formLoading.value = true
          const normalizedForm = JSON.parse(JSON.stringify(form.value))
          Object.keys(normalizedForm).forEach(key => {
            if (!normalizedForm[key]) delete normalizedForm[key]
          })
          const { data } = await tagService.updateOne(route.params.id, form.value)
          router.push({
            name: 'tags-edit',
            params: {
              id: data.id
            }
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
