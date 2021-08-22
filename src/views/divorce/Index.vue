<template>
  <div>
    <CCard>
      <CCardHeader>
        Data Perceraian
      </CCardHeader>
      <CCardBody>
        <div id="divorceList">
          <v-client-table ref="divorceListRef" :data="dataTable.tableData" :columns="dataTable.columns"
                          :options="dataTable.options">
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
              <CButton class="mr-2" color="primary" @click="$router.push(`/perceraian/review/${row.id}`)">
                <CIcon name="cil-find-in-page"></CIcon>
                Review
              </CButton>
              <CButton color="info" @click="$router.push(`/perceraian/surat/${row.id}`)">
                <CIcon name="cil-print"></CIcon>
                Print
              </CButton>
            </div>
          </v-client-table>
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import {notyError} from "../../utils/noty";
import {divorceApiIndex} from "../../api/divorceApi";

export default {
  name: "Index",
  data: () => ({
    dataTable: {
      columns: ['name', 'divorce_number', 'marital_number', 'status.status', 'action'],
      tableData: [],
      options: {
        headings: {
          name: 'Nama Pengaju Cerai',
          divorce_number: 'Nomor Akta Perceraian',
          marital_number: 'Nomor Akta Perkawinan',
          'status.status': "Status",
          action: 'Aksi'
        },
        perPage: 10,
        perPageValues: [10, 20, 30, 50],
        sortable: ['name'],
        filterable: ['name', 'divorce_number', 'marital_number', 'status.status']
      }
    }
  }),
  methods: {
    async fetchDivorce() {
      try {
        const {record} = await divorceApiIndex(1, 100000, this.$store.getters.auth.token)

        return record
      } catch (e) {
        notyError("Gagal fetch list perceraian")
      }
    },
    async syncDataTable() {
      this.$refs.divorceListRef.setLoadingState(true)
      this.dataTable.tableData = await this.fetchDivorce()
      this.$refs.divorceListRef.setLoadingState(false)
    }
  },
  async mounted() {
    await this.syncDataTable()
  }
}
</script>

<style scoped>

</style>