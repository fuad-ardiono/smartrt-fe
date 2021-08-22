<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://coreui.io" target="_blank">Smart RT</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}</span>
    </div>
    <div class="mfs-auto">
      <span class="mr-1" target="_blank">Aplikasi Perkawinan dan Perceraian</span>
      <a href="https://coreui.io/vue"></a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
