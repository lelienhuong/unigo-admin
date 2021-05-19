<template>
  <div v-loading="formLoading" class="app-container">
    <el-form
      ref="formUpdateRef"
      :model="form"
      :rules="formRules"
      label-width="120px"
    >
      <el-form-item label="Latitude">
        <el-input v-model="form.latitude" />
      </el-form-item>
      <el-form-item label="Longitude">
        <el-input v-model="form.longitude" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="School ID">
        <el-input v-model="form.schoolId" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Sector ID">
        <el-input v-model="form.sectorId" type="textarea" />
      </el-form-item>
      <el-form-item label="Stair ID">
        <el-input v-model="form.stairId" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Place ID">
        <el-input v-model="form.schoolId" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Stair Node Sequence">
        <el-input
          v-model="form.stairNodeSequence"
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="Sector Main Entrance">
        <el-input
          v-model="form.isSectorMainEntrance"
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="Place Main Entrance">
        <el-input
          v-model="form.isPlaceMainEntrance"
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="Floor Number">
        <el-input v-model="form.floorNumber" autocomplete="new-password" />
      </el-form-item>
      <el-form-item label="Near Nodes ID">
        <div v-for="(node, index) in form.nearNodes" :key="index">
          <el-form-item label="ID">
            <el-input v-model="node.id" autocomplete="new-password" />
          </el-form-item>
          <el-form-item label="Distance">
            <el-input v-model="node.distance" autocomplete="new-password" />
          </el-form-item>
        </div>
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
import { nodeService } from "@/services/node";
import { defineComponent, onBeforeMount, ref } from "@vue/composition-api";
import router from "@/router";
export default defineComponent({
  setup() {
    const route = router.history.current;

    const formUpdateRef = ref(null);
    const formRules = {
      latitude: [{ required: true, message: "This field is required" }],
      longitude: [{ required: true, message: "This field is required" }],
      schoolId: [{ required: true, message: "This field is required" }],
      sectorId: [{ required: true, message: "This field is required" }],
      stairId: [{ required: true, message: "This field is required" }],
      placeId: [{ required: true, message: "This field is required" }],
      stairNodeSequence: [],
      isSectorMainEntrance: [],
      isPlaceMainEntrance: [],
      floorNumber: [],
      nearNodes:[]
    };
    const formOriginal = {
     latitude: null,
      longitude: null,
      schoolId: null,
      sectorId: null,
      stairId: null,
      placeId: null,
      stairNodeSequence: null,
      isSectorMainEntrance: null,
      isPlaceMainEntrance: null,
      floorNumber: null,
      nearNodes:null
    };
    const form = ref(formOriginal);
    const formLoading = ref(false);

    const fetchOne = async (id) => {
      try {
        formLoading.value = true;
        const { data } = await nodeService.getOne(id);
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
          await nodeService.updateOne(route.params.id, form.value);
          await fetchOne(route.params.id);
        }
      } catch (err) {
        alert(err);
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
