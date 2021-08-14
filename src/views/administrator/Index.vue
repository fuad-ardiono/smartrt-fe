<template>
  <div>
    <CCard>
      <CCardHeader>
        List Administrator
      </CCardHeader>
      <CCardBody>
        <div id="adminList">
          <v-client-table ref="adminListRef" :data="dataTable.tableData" :columns="dataTable.columns" :options="dataTable.options">
            <div slot="action" slot-scope="{row}">
              <CButton color="danger" @click="handleDeleteAdmin(row.id)">Delete</CButton>
            </div>
          </v-client-table>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import {notyError} from "../../utils/noty";
import {userApiAdminDelete, userApiAdminUserList} from "../../api/userApi";
import {confirmDelete} from "../../utils/sweetalert";


export default {
  name: "Index",
  data: () => ({
    dataTable: {
      columns: ['name', 'email', 'nik', 'action'],
      tableData: [],
      options: {
        headings: {
          name: 'Nama',
          email: 'Email',
          nik: 'NIK',
          action: 'Aksi'
        },
        perPage: 10,
        perPageValues: [10, 20, 30, 50],
        sortable: ['name'],
        filterable: ['name']
      }
    }
  }),
  methods: {
    async fetchAdminList() {
      try {
        return await userApiAdminUserList(this.$store.getters.auth.token)
      } catch (e) {
        notyError("Gagal fetch list admin")
      }
    },
    async syncDataTable() {
      this.$refs.adminListRef.setLoadingState(true)
      this.dataTable.tableData = await this.fetchAdminList()
      this.$refs.adminListRef.setLoadingState(false)
    },
    async handleDeleteAdmin(id) {
      let confirmed = await confirmDelete()

      if (confirmed) {
        await userApiAdminDelete(id, this.$store.getters.auth.token)
        await this.syncDataTable()
      }
    }
  },
  async mounted() {
    await this.syncDataTable()
  }
}
</script>

<style scoped>

</style>