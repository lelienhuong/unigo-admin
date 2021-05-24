<template>
  <div v-loading="formLoading" class="app-container">
    <el-form
      ref="formUpdateRef"
      :model="form"
      :rules="formRules"
      label-width="120px"
    >
      <!-- <el-form-item label="Avatar">
        <el-image
          :src="form.avatar"
          fit="cover"
          style="width: 100px; height: 100px"
        />
        <el-input v-model="form.avatar" />
      </el-form-item> -->
      <el-form-item label="Name">
        <el-input v-model="form.fullName" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" autocomplete="new-password" />
      </el-form-item>

      <el-form-item label="Status">
        <el-input v-model="form.status" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          v-model="form.password"
          autocomplete="new-password"
          show-password
        />
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
import dev from "@/utils/dev";
import { userService } from "@/services/user";
import { defineComponent, onBeforeMount, ref } from "@vue/composition-api";
import router from "@/router";
export default defineComponent({
  setup() {
    const route = router.history.current;

    const formUpdateRef = ref(null);
    const formRules = {
      fullName: [{ required: true, message: "This field is required" }],
      password: [{ required: true, message: "This field is required" }],
      email: [{ required: true, message: "This field is required" }],
      status:[]
      // avatar: [],
    };
    const formOriginal = {
      fullName: null,
      password: null,
      email: null,
      status:null
      // avatar: null,
    };
    const form = ref(formOriginal);
    const formLoading = ref(false);

    const fetchOne = async (id) => {
      try {
        formLoading.value = true;
        const { data } = await userService.getOne(id);
        Object.keys(form.value).forEach((key) => {
          form.value[key] = data[key];
        });
      } catch (err) {
        dev.error(err);
      } finally {
        formLoading.value = false;
      }
    };

    const updateOne = async () => {
      try {
        if (formUpdateRef.value.validate()) {
          formLoading.value = true;
          const normalizedForm = JSON.parse(JSON.stringify(form.value));
          Object.keys(normalizedForm).forEach((key) => {
            if (!normalizedForm[key]) delete normalizedForm[key];
          });
          await userService.updateOne(route.params.id, form.value);
           router.push({
            name: "users-index",
          });
        }
      } catch (err) {
        dev.error(err);
      } finally {
        formLoading.value = false;
      }
    };

    const clearForm = () => {
      form.value = formOriginal;
      formUpdateRef.value.resetFields();
    };

    onBeforeMount(() => {
      fetchOne(route.params.id);
    });

    return {
      form,
      formLoading,
      formUpdateRef,
      formRules,
      clearForm,
      fetchOne,
      updateOne,
    };
  },
  mounted() {
    this.formUpdateRef = this.$refs.formUpdateRef;
  },
});
</script>
