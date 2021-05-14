<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      highlight-current-row
      :data="list"
      border
      fit
    >
      <el-table-column label="#" width="50" align="center" fixed>
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" style="width: 25px; height: 25px" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="Full Name" width="250">
        <template slot-scope="scope">
          <small style="margin-right: 0.5rem; display: inline-block"><b>#{{ scope.row.id }}</b></small>
          <span>{{ scope.row.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="250">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="Phone" width="130">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="Birthday">
        <template slot-scope="scope">
          {{ scope.row.birthday | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="Join date">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 0.25rem" />
          <span>{{ scope.row.createdAt | formatDateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="70" align="center" fixed="right">
        <template slot-scope="scope">
          <i style="cursor: pointer; margin: 0.5rem" class="el-icon-edit" @click="onEdit(scope.row.slug)" />
          <i style="cursor: pointer; margin: 0.5rem" class="el-icon-delete" @click="onDelete(scope.row.slug)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dev from '@/utils/dev'
import { userService } from '@/services/user'

export default {
  name: 'UsersIndexPage',
  data() {
    return {
      query: {
        page: 1,
        limit: 10
      },
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onEdit(id) {
      this.$router.push({
        name: 'users-edit',
        params: {
          id
        }
      })
    },
    async onDelete(id) {
      try {
        this.listLoading = true
        await userService.deleteOne(id)
      } catch (err) {
        dev.error(err)
      } finally {
        this.listLoading = false
      }
    },
    async fetchData() {
      try {
        this.listLoading = true
        const { data } = await userService.getMany(this.query)
        this.list = data.data
      } catch (err) {
        dev.error(err)
      } finally {
        this.listLoading = false
      }
    }
  }
}
</script>
