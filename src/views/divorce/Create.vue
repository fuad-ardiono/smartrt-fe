<template>
  <div>
    <CCard>
      <CCardHeader>
        Pengajuan Perceraian
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CInput
              label="Nama Pengaju Cerai"
              placeholder="Masukkan nama pengaju cerai"
              v-model="divorces.name"
              horizontal
          />
          <CInput
              label="NIK"
              placeholder="Masukkan NIK"
              v-model="divorces.nik"
              horizontal
          />
          <CInput
              label="Tempat Lahir"
              placeholder="Masukkan tempat lahir"
              v-model="divorces.birth_place"
              horizontal
          />
          <CInput
              label="Tanggal Lahir"
              v-model="divorces.birth_date"
              type="date"
              horizontal
          />
          <CInput
              label="Agama"
              placeholder="Masukkan agama"
              v-model="divorces.religion"
              horizontal
          />
          <CInput
              label="Alamat"
              placeholder="Masukkan alamat"
              v-model="divorces.address"
              horizontal
          />
          <label for="selectProvince">Provinsi</label>
          <div id="selectProvince">
            <v-select label="name"
                      :clearable="false" v-model="select.provinceId"
                      :options="list.provinceList"
                      placeholder="Pilih Provinsi"
                      :reduce="province => province.id"
                      class="col-sm-9 p-0"
                      @input="fetchCity">
            </v-select>
          </div>
          <label for="selectCity" class="mt-2">Kota</label>
          <div id="selectCity">
            <v-select label="name"
                      :disabled="select.provinceId === ''"
                      :clearable="false"
                      v-model="select.cityId"
                      placeholder="Pilih Kota"
                      :options="list.cityList"
                      :reduce="city => city.id"
                      class="col-sm-9 p-0"
                      @input="fetchDistrict">
            </v-select>
          </div>
          <label for="selectDistrict" class="mt-2">Kecamatan</label>
          <div id="selectDistrict">
            <v-select label="name"
                      :disabled="select.cityId === ''"
                      :clearable="false"
                      v-model="select.districtId"
                      placeholder="Pilih Kecamatan"
                      :options="list.districtList"
                      :reduce="district => district.id"
                      class="col-sm-9 p-0"
                      @input="fetchVillage">
            </v-select>
          </div>
          <label for="selectVillage" class="mt-2">Kelurahan</label>
          <div id="selectVillage">
            <v-select label="name"
                      :disabled="select.districtId === ''"
                      :clearable="false"
                      v-model="select.villageId"
                      placeholder="Pilih Kelurahan"
                      :options="list.villageList"
                      :reduce="village => village.id"
                      class="col-sm-9 p-0"
                      @input="fetchNeighbourhood">
            </v-select>
          </div>
          <label for="selectNeighbourhood" class="mt-2">Rukun Tetangga</label>
          <div id="selectNeighbourhood">
            <v-select label="name"
                      :disabled="select.villageId === ''"
                      :clearable="false"
                      placeholder="Pilih RT"
                      v-model="select.neighbourhoodId"
                      :options="list.neighbourhoodList"
                      :reduce="neighbourhood => neighbourhood.id"
                      class="col-sm-9 p-0">
            </v-select>
          </div>
          <CInput
              label="Nomor Akta Perceraian"
              placeholder="Masukkan nomor akta perceraian"
              v-model="divorces.divorce_number"
              horizontal
          />
          <CInput
              label="Nomor Seri Perceraian"
              placeholder="Masukkan nomor seri perceraian"
              v-model="divorces.divorce_serial_number"
              horizontal
          />
          <CInput
              label="Nomor Akta Perkawinan"
              placeholder="Masukkan nomor akta perkawinan"
              v-model="divorces.marital_number"
              horizontal
          />
          <CInput
              label="Tanggal Perceraian"
              v-model="divorces.divorce_date"
              type="date"
              horizontal
          />
          <CInput
              label="Tempat Perceraian"
              placeholder="Masukkan tempat perceraian"
              v-model="divorces.divorce_place"
              horizontal
          />
          <CInputFile
              class="my-3"
              label="Foto Akta Perceraian"
              horizontal
              @change="onFileChange($event)"
          />
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton class="mr-2" type="submit" size="sm" color="info" @click="createDivorce">Submit</CButton>
        <CButton type="reset" size="sm" color="primary" @click="$router.go(-1)">Kembali</CButton>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import {notyError, notySuccess} from "../../utils/noty";
import {
  locationApiCityList,
  locationApiDistrictList, locationApiNeighbourhoodList,
  locationApiProvinceList,
  locationApiVillageList
} from "../../api/locationApi";
import {validate} from "../../utils/validator";
import {divorceApiCreate} from "../../api/divorceApi";

export default {
  name: "Create",
  data: () => ({
    divorces: {
      divorce_number: '',
      marital_number: '',
      divorce_serial_number: '',
      divorce_date: '',
      divorce_place: '',
      name: '',
      nik: '',
      birth_place: '',
      birth_date: '',
      religion: '',
      address: '',
      attachment: '',
      neighbourhoodId: ''
    },
    select: {
      provinceId: "",
      cityId: "",
      districtId: "",
      villageId: "",
      neighbourhoodId: ""
    },
    list: {
      provinceList: [],
      cityList: [],
      districtList: [],
      villageList: [],
      neighbourhoodList: []
    },
  }),
  methods: {
    async fetchProvince() {
      try {
        this.list.provinceList = await locationApiProvinceList()
      } catch (e) {
        notyError("Gagal fetch list provinsi")
      }
    },
    async fetchCity() {
      console.log()
      try {
        this.list.cityList = await locationApiCityList(this.select.provinceId)
      } catch (e) {
        console.log(e)
        notyError("Gagal fetch list kota")
      }
    },
    async fetchDistrict() {
      try {
        this.list.districtList = await locationApiDistrictList(this.select.cityId)
      } catch (e) {
        notyError("Gagal fetch list kecamatan")
      }
    },
    async fetchVillage() {
      try {
        this.list.villageList = await locationApiVillageList(this.select.districtId)
      } catch (e) {
        notyError("Gagal fetch list kelurahan")
      }
    },
    async fetchNeighbourhood() {
      try {
        this.list.neighbourhoodList = await locationApiNeighbourhoodList(this.select.villageId)
      } catch (e) {
        notyError("Gagal fetch list RT")
      }
    },
    async createDivorce() {
      let fd = new FormData();

      fd.append("divorce_number", this.divorces.divorce_number)
      fd.append("marital_number", this.divorces.marital_number)
      fd.append("divorce_serial_number", this.divorces.divorce_serial_number)
      fd.append("divorce_date", this.divorces.divorce_date)
      fd.append("divorce_place", this.divorces.divorce_place)
      fd.append("name", this.divorces.name)
      fd.append("nik", this.divorces.nik)
      fd.append("birth_place", this.divorces.birth_place)
      fd.append("birth_date", this.divorces.birth_date)
      fd.append("religion", this.divorces.religion)
      fd.append("address", this.divorces.address)
      fd.append("attachment", this.divorces.attachment)
      fd.append("neighbourhood_id", this.select.neighbourhoodId)

      try {
        await divorceApiCreate(fd, this.$store.getters.auth.token)
        notySuccess("Berhasil mengajukan perceraian")
        this.$router.push('/perceraian')
      } catch (e) {
        validate(e.message)
      }
    },
    onFileChange(e) {
      this.divorces.attachment = e[0]
    }
  },
  async mounted() {
    await this.fetchProvince()
  }
}
</script>

<style scoped>

</style>