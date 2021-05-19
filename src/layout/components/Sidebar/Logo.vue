<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <img v-else :src="logoText" alt="unigo.pro">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link-expanded" to="/">
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo"> -->
        <img class="sidebar-logo-text" :src="logoText" alt="unigo.pro">
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logo: '/logo/logo.jpg',
      logoText: '/logo/logo-and-text.svg'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: var(--color-white);
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    display: flex !important;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      border-radius: 9999px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      /* line-height: 50px; */
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
  & .sidebar-logo-link-expanded{
    display: flex !important;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-left: 5px;
    & .sidebar-logo-text {
      width: 7rem;
      height: auto;
      justify-content: end !important;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
