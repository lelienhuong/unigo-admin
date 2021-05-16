<template>
  <div class="app-container">
    <my-el-table
      v-loading="listLoading"
      :query="query"
      :data="list"
      :total="listTotal"
      @my-table-page-change="onPageChange"
      @my-table-edit="onEdit($event.slug)"
      @my-table-delete="onDelete($event.slug)"
    >
      <el-table-column label="Full Name" width="250">
        <template slot-scope="scope">
          <small style="margin-right: 0.5rem; display: inline-block"><b>#{{ scope.row.id }}</b></small>
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Description" width="350">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column label="Created date">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 0.25rem" />
          <span>{{ scope.row.createdAt | formatDateTime }}</span>
        </template>
      </el-table-column>
    </my-el-table>
  </div>
</template>

<script>
import dev from '@/utils/dev'
import { categoryService } from '@/services/category'
import { defineComponent } from '@vue/composition-api'
import { useElement } from '@/use/element'
const { confirmAction } = useElement()

export default defineComponent({
  name: 'CategorysIndexPage',
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
  created() {
    this.fetchData()
  },
  methods: {
    async onPageChange(page) {
      this.query.page = page
      await this.fetchData()
    },
    onEdit(slug) {
      this.$router.push({
        name: 'categories-edit',
        params: {
          slug
        }
      })
    },
    onDelete(slug) {
      confirmAction({
        title: 'This will delete the record. Continue?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
      }, async() => {
        try {
          this.listLoading = true
          await categoryService.deleteOne(slug)
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
        const { data } = await categoryService.getMany(this.query)
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
