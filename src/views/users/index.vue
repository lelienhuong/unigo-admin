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
      <el-table-column label="#" width="50" align="center" fixed>
        <template slot-scope="scope">
          <el-image
            :src="scope.row.avatar"
            style="width: 25px; height: 25px"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="Full Name" width="250">
        <template slot-scope="scope">
          <small style="margin-right: 0.5rem; display: inline-block"
            ><b>#{{ scope.row.id }}</b></small
          >
          <span>{{ scope.row.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="250">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="130">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="Roles">
        <template slot-scope="scope">
          <div v-for="(role, index) in scope.row.roles" :key="index">
            {{ role }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Join date">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 0.25rem" />
          <span>{{ scope.row.createdAt | formatDateTime }}</span>
        </template>
      </el-table-column> -->
    </my-el-table>
  </div>
</template>

<script>
import dev from "@/utils/dev";
import { userService } from "@/services/user";
import { defineComponent } from "@vue/composition-api";
import { useElement } from "@/use/element";
const { confirmAction } = useElement();

export default defineComponent({
  name: "UsersIndexPage",
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
        name: "users-edit",
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
            await userService.deleteOne(id);
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
        const { data } = await userService.getMany(this.query);
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
