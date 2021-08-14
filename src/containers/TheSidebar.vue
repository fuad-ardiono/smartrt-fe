<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
    style="background-color: #39f"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      Aplikasi Perkawinan dan Perceraian
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="navList"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
export default {
  name: 'TheSidebar',
  props: {
    navList: {
      type: Array
    }
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }
}
</script>
