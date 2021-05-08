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
      <el-table-column align="center" label="Rate" width="70">
        <template slot-scope="scope">
          {{ scope.row.rate }}
        </template>
      </el-table-column>
      <el-table-column label="Content">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="Review detail">
        <template slot-scope="scope">
          <el-collapse accordion>
            <el-collapse-item v-for="detail in scope.row.reviewDetails" :key="`review-${scope.row.id}-${detail.id}`" :name="detail.id">
              <template slot="title">
                <el-tag type="primary" size="mini" effect="dark" style="margin-left: 1rem">
                  <b>{{ detail.criterion.name }}: </b><span>{{ detail.rate }}</span>
                </el-tag>
              </template>
              <div style="padding: 1rem">{{ detail.content }}</div>
            </el-collapse-item>
          </el-collapse>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dev from '@/utils/dev'
import { reviewService } from '@/services/review'

export default {
  name: 'ReviewsIndexPage',
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
        const { data } = await reviewService.getMany(this.query)
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
