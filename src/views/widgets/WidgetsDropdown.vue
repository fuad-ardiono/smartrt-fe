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
      <PieChart :data="dataDummy.chartData" title-props="Data Perkawinan"></PieChart>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="info" header="9.823" text="Data Perkawinan">
        <template #footer>
          <div style="width: 100%; height: 6rem; text-align: center;">
            <CIcon name="cib-hackhands" style="margin-top: 2rem;width: 2rem; height: 2rem"></CIcon>
          </div>
        </template>
      </CWidgetDropdown>
      <PieChart :data="dataDummy.chartData" title-props="Data Perceraian"></PieChart>
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
import PieChart from "../../components/PieChart";

export default {
  name: 'WidgetsDropdown',
  components: {PieChart},
  data: () => ({
    dataDummy: {
      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ]
    }
  })
}
</script>
