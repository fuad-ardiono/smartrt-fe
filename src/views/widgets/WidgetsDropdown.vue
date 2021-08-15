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
                v-model="date.all.startDate"
                type="date"
            />
            <CInput
                label="Tanggal Akhir"
                type="date"
                v-model="date.all.endDate"
                @input="handleDateAll"
            />
            <label for="selectProvince">Provinsi</label>
            <div id="selectProvince">
              <v-select label="name"
                        :clearable="false" v-model="select.all.provinceId"
                        :options="list.all.provinceList"
                        placeholder="Pilih Provinsi"
                        :reduce="province => province.id"
                        class="col-sm-9 p-0"
                        @input="fetchCityAll">
              </v-select>
            </div>
            <label for="selectCity" class="mt-2">Kota</label>
            <div id="selectCity">
              <v-select label="name"
                        :disabled="select.all.provinceId === ''"
                        :clearable="false"
                        v-model="select.all.cityId"
                        placeholder="Pilih Kota"
                        :options="list.all.cityList"
                        :reduce="city => city.id"
                        class="col-sm-9 p-0"
                        @input="fetchDistrictAll">
              </v-select>
            </div>
            <label for="selectDistrict" class="mt-2">Kecamatan</label>
            <div id="selectDistrict">
              <v-select label="name"
                        :disabled="select.all.cityId === ''"
                        :clearable="false"
                        placeholder="Pilih Kecamatan"
                        v-model="select.all.districtId"
                        :options="list.all.districtList"
                        :reduce="district => district.id"
                        class="col-sm-9 p-0"
                        @input="fetchVillageAll">
              </v-select>
            </div>
            <label for="selectVillage" class="mt-2">Kelurahan</label>
            <div id="selectVillage">
              <v-select label="name"
                        :disabled="select.all.districtId === ''"
                        :clearable="false"
                        v-model="select.all.villageId"
                        placeholder="Pilih Kelurahan"
                        :options="list.all.villageList"
                        :reduce="village => village.id"
                        class="col-sm-9 p-0"
                        @input="fetchNeighbourhoodAll">
              </v-select>
            </div>
            <label for="selectNeighbourhood" class="mt-2">Rukun Tetangga</label>
            <div id="selectNeighbourhood">
              <v-select label="name"
                        :disabled="select.all.villageId === ''"
                        :clearable="false"
                        placeholder="Pilih RT"
                        v-model="select.all.neighbourhoodId"
                        :options="list.all.neighbourhoodList"
                        :reduce="neighbourhood => neighbourhood.id"
                        class="col-sm-9 p-0"
                        @input="handleSelectNeighbourhoodAll">
              </v-select>
            </div>
          </CCardBody>
        </CForm>
      </CCard>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" :header="widget.all" text="Total Data">
        <template #footer>
          <div style="width: 100%; height: 6rem; text-align: center;">
            <CIcon name="cil-calculator" style="margin-top: 2rem;width: 2rem; height: 2rem"></CIcon>
          </div>
        </template>
      </CWidgetDropdown>
      <PieChart :data="dataMarital" title-props="Data Perkawinan"></PieChart>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="info" :header="widget.marital" text="Data Perkawinan">
        <template #footer>
          <div style="width: 100%; height: 6rem; text-align: center;">
            <CIcon name="cib-hackhands" style="margin-top: 2rem;width: 2rem; height: 2rem"></CIcon>
          </div>
        </template>
      </CWidgetDropdown>
      <PieChart :data="dataDivorce" title-props="Data Perceraian"></PieChart>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
          color="danger"
          :header="widget.divorce"
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
import moment from "moment";
import {statisticApiGetChartData, statisticApiGetTotalData} from "../../api/statisticApi";
import {notyError} from "../../utils/noty";
import {
  locationApiCityList,
  locationApiDistrictList, locationApiNeighbourhoodList,
  locationApiProvinceList,
  locationApiVillageList
} from "../../api/locationApi";

export default {
  name: 'WidgetsDropdown',
  components: {PieChart},
  data: () => ({
    widget: {
      all: 0,
      marital: 0,
      divorce: 0
    },
    loadedMaritalChart: false,
    loadedDivorceChart: false,
    dataMarital: [
      ['Tahun', 'Perkawinan'],
    ],
    dataDivorce: [
      ['Tahun', 'Perceraian']
    ],
    select: {
      all: {
        provinceId: "",
        cityId: "",
        districtId: "",
        villageId: "",
        neighbourhoodId: ""
      },
      marital: {
        provinceId: "",
        cityId: "",
        districtId: "",
        villageId: "",
        neighbourhoodId: ""
      },
      divorce: {
        provinceId: "",
        cityId: "",
        districtId: "",
        villageId: "",
        neighbourhoodId: ""
      }
    },
    date: {
      all: {
        startDate: "2000-01-01",
        endDate: moment().format("YYYY-MM-DD")
      },
      marital: {
        startDate: "",
        endDate: ""
      },
      divorce: {
        startDate: "",
        endDate: ""
      }
    },
    list: {
      all: {
        provinceList: [],
        cityList: [],
        districtList: [],
        villageList: [],
        neighbourhoodList: []
      },
      marital: {
        provinceList: [],
        cityList: [],
        districtList: [],
        villageList: [],
        neighbourhoodList: []
      },
      divorce: {
        provinceList: [],
        cityList: [],
        districtList: [],
        villageList: [],
        neighbourhoodList: []
      }
    },
  }),
  methods: {
    async fetchChartMarital() {
      try {
        const response = await statisticApiGetChartData("MARITAL")

        await response.map((obj) => {
          this.dataMarital.push([obj.name.toString(), obj.value])
        })

        this.loadedMaritalChart = true
      } catch (e) {
        console.log(e)
        notyError("Gagal fetch perkawinan chart data")
      }
    },
    async fetchChartDivorce() {
      try {
        const response = await statisticApiGetChartData("DIVORCE")

        await response.map((obj) => {
          this.dataDivorce.push([obj.name.toString(), obj.value])
        })

        this.loadedDivorceChart = true
      } catch (e) {
        console.log(e)
        notyError("Gagal fetch perceraian chart data")
      }
    },
    async fetchProvince() {
      try {
        const response = await locationApiProvinceList()
        this.list.all.provinceList = response
        this.list.marital.provinceList = response
        this.list.divorce.provinceList = response
      } catch (e) {
        notyError("Gagal fetch list provinsi")
      }
    },
    async fetchCityAll() {
      console.log()
      try {
        this.list.all.cityList = await locationApiCityList(this.select.all.provinceId)
        await this.handleQueryAll()
      } catch (e) {
        console.log(e)
        notyError("Gagal fetch list kota")
      }
    },
    async fetchDistrictAll() {
      try {
        this.list.all.districtList = await locationApiDistrictList(this.select.all.cityId)
        this.select.all.districtId = ""
        this.select.all.villageId = ""
        this.select.all.neighbourhoodId = ""
        await this.handleQueryAll()
      } catch (e) {
        notyError("Gagal fetch list kecamatan")
      }
    },
    async fetchVillageAll() {
      try {
        this.list.all.villageList = await locationApiVillageList(this.select.all.districtId)
        this.select.all.villageId = ""
        this.select.all.neighbourhoodId = ""
        await this.handleQueryAll()
      } catch (e) {
        notyError("Gagal fetch list kelurahan")
      }
    },
    async fetchNeighbourhoodAll() {
      try {
        this.list.all.neighbourhoodList = await locationApiNeighbourhoodList(this.select.all.villageId)
        this.select.all.neighbourhoodId = ""
        await this.handleQueryAll()
      } catch (e) {
        notyError("Gagal fetch list RT")
      }
    },
    async handleSelectNeighbourhoodAll() {
      await this.handleQueryAll()
    },
    async handleDateAll() {
      await this.handleQueryAll()
    },
    async handleQueryAll() {
      try {
        const query = [];
        query.push("type=ALL")

        if (this.date.all.startDate !== "" && this.date.all.endDate !== "") {
          query.push(`startDate=${this.date.all.startDate}&endDate=${this.date.all.endDate}`)
        }

        if (this.select.all.provinceId !== "") {
          query.push(`provinceId=${this.select.all.provinceId}`)
        }

        if (this.select.all.cityId !== "") {
          query.push(`cityId=${this.select.all.cityId}`)
        }

        if (this.select.all.districtId !== "") {
          query.push(`districtId=${this.select.all.districtId}`)
        }

        if (this.select.all.villageId !== "") {
          query.push(`villageId=${this.select.all.villageId}`)
        }

        if (this.select.all.neighbourhoodId !== "") {
          query.push(`neighbourhoodId=${this.select.all.neighbourhoodId}`)
        }


        const response = await statisticApiGetTotalData(query.join("&"))
        this.widget.all = response.totalData
        this.widget.marital = response.marital
        this.widget.divorce = response.divorce
      } catch (e) {
        notyError("Gagal fetch data statistik")
      }
    },
  },
  async mounted() {
    await this.fetchChartMarital()
    await this.fetchChartDivorce()
    await this.fetchProvince()
    await this.handleQueryAll()
  }
}
</script>
