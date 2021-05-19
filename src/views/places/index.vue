<template>
  <div class="app-container">
    <my-el-table
      v-loading="listLoading"
      :query="query"
      :data="list"
      :total="listTotal"
      @my-table-page-change="onPageChange"
      @my-table-edit="onEdit($event.id)"
      @my-table-delete="onDelete($event.id)"
    >
      <el-table-column label="#ID" width="50" align="center" fixed>
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Name" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Floor" width="100">
        <template slot-scope="scope">
          {{ scope.row.floorNumber }}
        </template>
      </el-table-column>
      <el-table-column label="Sector ID" width="200">
        <template slot-scope="scope">
          {{ scope.row.sectorId }}
        </template>
      </el-table-column>
      <el-table-column label="Category ID" width="200">
        <template slot-scope="scope">
          {{ scope.row.categoryId }}
        </template>
      </el-table-column>
      <el-table-column label="NameTag" width="130">
        <template slot-scope="scope">
          {{ scope.row.nameTag }}
        </template>
      </el-table-column>
      <el-table-column label="Description">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="Updated date">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 0.25rem" />
          <span>{{ scope.row.updatedAt | formatDateTime }}</span>
        </template>
      </el-table-column>
    </my-el-table>
  </div>
</template>

<script>
import dev from "@/utils/dev";
import { placeService } from "@/services/place";
import { defineComponent } from "@vue/composition-api";
import { useElement } from "@/use/element";
const { confirmAction } = useElement();

export default defineComponent({
  name: "PlacesIndexPage",
  data() {
    return {
      query: {
        page: 1,
        limit: 10,
      },
      list: null,
      listTotal: null,
      listLoading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async onPageChange(page) {
      this.query.page = page;
      await this.fetchData();
    },
    onEdit(id) {
      this.$router.push({
        name: "places-edit",
        params: {
          id,
        },
      });
    },
    onDelete(id) {
      confirmAction(
        {
          title: "This will delete the record. Continue?",
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
        },
        async () => {
          try {
            this.listLoading = true;
            await placeService.deleteOne(id);
            await this.fetchData();
          } catch (err) {
            dev.error(err);
          } finally {
            this.listLoading = false;
          }
        }
      );
    },
    async fetchData() {
      try {
        this.listLoading = true;
        const { data } = await placeService.getMany(this.query);
        this.list = data.content;
        this.listTotal = data.meta.totalRecord;
      } catch (err) {
        dev.error(err);
      } finally {
        this.listLoading = false;
      }
    },
  },
});
</script>
