<template>
  <div>
    <div style="text-align: center; margin: 1rem auto">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="query.limit"
        :current-page="query.page"
        :total="total"
        @current-change="onPageChange"
      />
    </div>
    <el-table
      element-loading-text="Loading"
      highlight-current-row
      :data="data"
      border
      fit
    >
      <slot />
      <el-table-column v-if="actions.length > 0" width="70" align="center" fixed="right">
        <template slot-scope="scope">
          <i
            v-for="action in actions"
            :key="'table-action-' + action.name"
            style="cursor: pointer; margin: 0.75rem; font-size: 1.25rem"
            :class="action.icon"
            @click="onTableAction({ action: action.name, payload: scope.row })"
          />
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin: 1rem auto">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="query.limit"
        :current-page="query.page"
        :total="total"
        @current-change="onPageChange"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    query: {
      type: Object,
      default() {
        return {
          page: 1,
          limit: 10
        }
      }
    },
    actions: {
      type: Array,
      default() {
        return [
          {
            name: 'edit',
            icon: 'el-icon-edit'
          },
          {
            name: 'delete',
            icon: 'el-icon-delete'
          }
        ]
      }
    }
  },
  setup(_, { emit }) {
    function onTableAction({ action, payload }) {
      emit('my-table-' + action, payload)
    }

    function onPageChange(page) {
      emit('my-table-page-change', page)
    }

    return {
      onTableAction,
      onPageChange
    }
  }
})
</script>
