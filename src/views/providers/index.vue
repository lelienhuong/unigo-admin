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
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.logo" style="width: 25px; height: 25px" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Code">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="Phone">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="Email">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="Website">
        <template slot-scope="scope">
          {{ scope.row.website }}
        </template>
      </el-table-column>
      <el-table-column label="Type">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dev from '@/utils/dev'
import { providerService } from '@/services/provider'

export default {
  name: 'ProvidersIndexPage',
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
    async fetchData() {
      try {
        this.listLoading = true
        const { data } = await providerService.getMany(this.query)
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
