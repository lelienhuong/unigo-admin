<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hello {{ fullName }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userService } from '@/services/user'

export default {
  name: 'Dashboard',
  data(){
    return {
      fullName:null
    }
  },
  async mounted(){
    const {data} = await userService.getOne(JSON.parse(localStorage.getItem('auth')).user.id)
    this.fullName = data.fullName
  }
  // computed: {
  //   ...mapState({
  //     fullName: (state) => state.auth.data?.user?.fullName
  //   })
  // }
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
