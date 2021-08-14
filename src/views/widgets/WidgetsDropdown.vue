<template>
  <CRow>
    <CCol sm="6" lg="3">
      <CCard>
        <CCardHeader>
          <strong>Filter</strong>
        </CCardHeader>
        <CForm novalidate>
          <CCardBody>
            <CInput
                label="Tanggal Awal"
                type="date"
            />
            <CInput
                label="Tanggal Akhir"
                type="date"
            />
            <CSelect
                label="Provinsi"
                size="md"
                :value.sync="selectedOption"
                :options="selectOptions"
                placeholder="Pilih Provinsi"
            />
            <CSelect
                label="Kota"
                size="md"
                :value.sync="selectedOption"
                :options="selectOptions"
                placeholder="Pilih Kota"
            />
            <CSelect
                label="Kecamatan"
                size="md"
                :value.sync="selectedOption"
                :options="selectOptions"
                placeholder="Pilih Kecamatan"
            />
            <CSelect
                label="Kelurahan"
                size="md"
                :value.sync="selectedOption"
                :options="selectOptions"
                placeholder="Pilih Kelurahan"
            />
            <CSelect
                label="Rukun Tetangga"
                size="md"
                :value.sync="selectedOption"
                :options="selectOptions"
                placeholder="Pilih RT"
            />

          </CCardBody>
        </CForm>
      </CCard>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" header="9.823" text="Total Data">
        <template #footer>
          <div style="width: 100%; height: 6rem; text-align: center;">
            <CIcon name="cil-calculator" style="margin-top: 2rem;width: 2rem; height: 2rem"></CIcon>
          </div>
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="info" header="9.823" text="Data Perkawinan">
        <template #footer>
          <div style="width: 100%; height: 6rem; text-align: center;">
            <CIcon name="cib-hackhands" style="margin-top: 2rem;width: 2rem; height: 2rem"></CIcon>
          </div>
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
          color="danger"
          header="9.823"
          text="Data Perceraian"
      >
        <template #footer>
          <div style="width: 100%; height: 6rem; text-align: center;">
            <CIcon name="cib-hackhands" style="margin-top: 2rem;width: 2rem; height: 2rem"></CIcon>
          </div>
        </template>
      </CWidgetDropdown>
    </CCol>
  </CRow>
</template>

<script>
export default {
  name: 'WidgetsDropdown',
}
</script>
