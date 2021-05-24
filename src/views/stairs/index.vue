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
      <el-table-column label="#ID" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Name" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Sector ID" >
        <template slot-scope="scope">
          <span> #{{ scope.row.sectorId }} {{ scope.row.sectorName }} </span>
        </template>
      </el-table-column>
     
    </my-el-table>
  </div>
</template>

<script>
import dev from '@/utils/dev'
import { stairService } from '@/services/stair'
import { defineComponent } from '@vue/composition-api'
import { useElement } from '@/use/element'
const { confirmAction } = useElement()

export default defineComponent({
  name: 'StairsIndexPage',
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
    onEdit(id) {
      this.$router.push({
        name: 'stairs-edit',
        params: {
          id
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
          await stairService.deleteOne(slug)
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
        const { data } = await stairService.getMany(this.query)
        this.list = data.content
        this.listTotal = data.meta.totalRecord
      } catch (err) {
        dev.error(err)
      } finally {
        this.listLoading = false
      }
    }
  }
})
</script>
