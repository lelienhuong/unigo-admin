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
import { defineComponent } from '@vue/composition-api'
import { useElement } from '@/use/element'
const { confirmAction } = useElement()

export default defineComponent({
  name: 'CredentialsIndexPage',
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
        name: 'credentials-edit',
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
          await credentialService.deleteOne(slug)
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
        const { data } = await credentialService.getMany(this.query)
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
