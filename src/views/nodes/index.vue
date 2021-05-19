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
      <el-table-column label="Latitude" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.latitude }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Longitude" width="250">
        <template slot-scope="scope">
          {{ scope.row.longitude }}
        </template>
      </el-table-column>
      <el-table-column label="SchoolId" width="130">
        <template slot-scope="scope">
          {{ scope.row.schoolId }}
        </template>
      </el-table-column>
      <el-table-column label="Sector ID">
        <template slot-scope="scope">
          {{ scope.row.sectorId }}
        </template>
      </el-table-column>
      <el-table-column label="Stair ID">
        <template slot-scope="scope">
          {{ scope.row.stairId }}
        </template>
      </el-table-column>
      <el-table-column label="Near Nodes ID">
        <template slot-scope="scope">
         <div v-for="(node,index) in scope.row.nearNodes" :key="index">
          {{node.id }}
        </div>
        </template>
      </el-table-column>
    </my-el-table>
  </div>
</template>

<script>
import dev from "@/utils/dev";
import { nodeService } from "@/services/node";
import { defineComponent } from "@vue/composition-api";
import { useElement } from "@/use/element";
const { confirmAction } = useElement();

export default defineComponent({
  name: "NodesIndexPage",
  data() {
    return {
      query: {
        page: 1,
        limit: 10,
      },
      list: null,
      listTotal: null,
      listLoading: true,
      nearNodes:[]
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
        name: "nodes-edit",
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
            await nodeService.deleteOne(id);
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
        const { data } = await nodeService.getMany(this.query);
        this.list = data.content[0];
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
