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
      <el-table-column label="Label">
        <template slot-scope="scope">
          <small style="margin-right: 0.5rem; display: inline-block"><b>#{{ scope.row.id }}</b></small>
          <span>{{ scope.row.label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Created date" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time" style="margin-right: 0.25rem" />
          <span>{{ scope.row.createdAt | formatDateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="70" align="center" fixed="right">
        <template slot-scope="scope">
          <i
            style="cursor: pointer; margin: 0.75rem; font-size: 1.25rem"
            class="el-icon-edit"
            @click="onEdit(scope.row.id)"
          />
          <i
            style="cursor: pointer; margin: 0.75rem; font-size: 1.25rem"
            class="el-icon-delete"
            @click="onDelete(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dev from '@/utils/dev'
import { tagService } from '@/services/tag'
import { defineComponent } from '@vue/composition-api'
import { useElement } from '@/use/element'
const { confirmAction } = useElement()

export default defineComponent({
  name: 'TagsIndexPage',
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
        name: 'tags-edit',
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
          await tagService.deleteOne(id)
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
        const { data } = await tagService.getMany(this.query)
        this.list = data.data
      } catch (err) {
        dev.error(err)
      } finally {
        this.listLoading = false
      }
    }
  }
})
</script>
