<template>
  <div>
    <CCard>
      <CCardHeader>
        List Administrator
      </CCardHeader>
      <CCardBody>
        <div id="maritalList">
          <v-client-table ref="maritalListRef" :data="dataTable.tableData" :columns="dataTable.columns" :options="dataTable.options">
            <div slot="status.status" slot-scope="{row}">
              <span class="badge bg-success text-white" v-if="row.status.status === 'Approved'">
                {{ row.status.status }}
              </span>
              <span class="badge bg-info text-white" v-else-if="row.status.status === 'Waiting for Approval'">
                {{ row.status.status }}
              </span>
              <span class="badge bg-danger text-white" v-else>{{ row.status.status }}</span>
            </div>
            <div slot="action" slot-scope="{row}">
              <CButton class="mr-2" color="primary" @click="$router.push(`/perkawinan/review/${row.id}`)"><CIcon name="cil-find-in-page"></CIcon> Review</CButton>
              <CButton color="info" @click="$router.push(`/perkawinan/surat/${row.id}`)"><CIcon name="cil-print"></CIcon> Print</CButton>
            </div>
          </v-client-table>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import {notyError} from "../../utils/noty";
import {maritalApiIndex} from "../../api/maritalApi";

export default {
  name: "Index",
  data: () => ({
    dataTable: {
      columns: ['husband_name', 'wife_name', 'marital_number', 'status.status', 'action'],
      tableData: [],
      options: {
        headings: {
          husband_name: 'Nama Suami',
          wife_name: 'Nama Istri',
          marital_number: 'Nomor Akta Perkawinan',
          'status.status': "Status",
          action: 'Aksi'
        },
        perPage: 10,
        perPageValues: [10, 20, 30, 50],
        sortable: ['name'],
        filterable: ['husband_name', 'wife_name', 'marital_serial_number', 'status.status']
      }
    }
  }),
  methods: {
    async fetchMaritalList() {
      try {
        const { record } = await maritalApiIndex(1, 100000, name, this.$store.getters.auth.token)

        return await record
      } catch (e) {
        notyError("Gagal fetch list marital")
      }
    },
    async syncDataTable() {
      this.$refs.maritalListRef.setLoadingState(true)
      this.dataTable.tableData = await this.fetchMaritalList()
      this.$refs.maritalListRef.setLoadingState(false)
    }
  },
  async mounted() {
    await this.syncDataTable()
  }
}
</script>

<style scoped>

</style>