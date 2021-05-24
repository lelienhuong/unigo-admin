<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hello {{ fullName }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapState({
      fullName: (state) => state.auth.data?.user?.email
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
