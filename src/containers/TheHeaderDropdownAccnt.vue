<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <p>{{ $store.getters.auth.user.name }} | {{ $store.getters.auth.user.role.name.charAt(0).toUpperCase() +
          $store.getters.auth.user.role.name.slice(1)
          }} <CIcon name="cil-user" style="height: 25px; width: 25px;"></CIcon></p>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked"/> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("authLogout")
      this.$store.dispatch("setSidebarList")
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>