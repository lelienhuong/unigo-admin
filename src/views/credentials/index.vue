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
    </el-table>
  </div>
</template>

<script>
import dev from '@/utils/dev'
import { credentialService } from '@/services/credential'

export default {
  name: 'CredentialsIndexPage',
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
        const { data } = await credentialService.getMany(this.query)
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
