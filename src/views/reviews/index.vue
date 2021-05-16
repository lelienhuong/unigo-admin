<template>
  <div class="app-container">
    <my-el-table
      v-loading="listLoading"
      :query="query"
      :data="list"
      :total="listTotal"
      :actions="[]"
      @my-table-page-change="onPageChange"
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
    </my-el-table>
  </div>
</template>

<script>
import dev from '@/utils/dev'
import { reviewService } from '@/services/review'
import { defineComponent } from '@vue/composition-api'
import { useElement } from '@/use/element'
const { confirmAction } = useElement()

export default defineComponent({
  name: 'ReviewssIndexPage',
  data() {
    return {
      query: {
        page: 1,
        limit: 10
      },
      list: null,
      listTotal: null,
      listLoading: true
    }
  },
  async created() {
    await this.fetchData()
  },
  methods: {
    async onPageChange(page) {
      this.query.page = page
      await this.fetchData()
    },
    onEdit(id) {
      this.$router.push({
        name: 'reviews-edit',
        params: {
          id
        }
      })
    },
    onDelete(id) {
      confirmAction({
        title: 'This will delete the record. Continue?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
      }, async() => {
        try {
          this.listLoading = true
          await reviewService.deleteOne(id)
          await this.fetchData()
        } catch (err) {
          dev.error(err)
        } finally {
          this.listLoading = false
        }
      })
    },
    async fetchData() {
      try {
        this.listLoading = true
        const { data } = await reviewService.getMany(this.query)
        this.list = data.data
        this.listTotal = data.total
      } catch (err) {
        dev.error(err)
      } finally {
        this.listLoading = false
      }
    }
  }
})
</script>
