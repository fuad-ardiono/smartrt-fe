<template>
  <div>
    <CCard>
      <CCardHeader>
        Pengajuan Perkawinan
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CInput
              label="Nama Suami"
              v-model="maritals.husband_name"
              placeholder="Masukkan nama suami"
              horizontal
          />
          <CInput
              label="NIK Suami"
              placeholder="Masukkan NIK suami"
              v-model="maritals.husband_nik"
              horizontal
          />
          <CInput
              label="Tempat Lahir Suami"
              placeholder="Masukkan tempat lahir suami"
              v-model="maritals.husband_birth_place"
              horizontal
          />
          <CInput
              label="Tanggal Lahir Suami"
              placeholder="Masukkan tanggal lahir suami"
              v-model="maritals.husband_birth_date"
              type="date"
              horizontal
          />
          <CInput
              label="Kewarganegaraan Suami"
              placeholder="Masukkan kewarganegaran suami"
              v-model="maritals.husband_nationality"
              horizontal
          />
          <CInput
              label="Agama Suami"
              placeholder="Masukkan agama suami"
              v-model="maritals.husband_religion"
              horizontal
          />
          <CInput
              label="Nama Istri"
              placeholder="Masukkan nama istri"
              v-model="maritals.wife_name"
              horizontal
          />
          <CInput
              label="NIK Istri"
              placeholder="Masukkan NIK Istri"
              v-model="maritals.wife_nik"
              horizontal
          />
          <CInput
              label="Tempat Lahir Istri"
              placeholder="Masukkan tempat lahir istri"
              v-model="maritals.wife_birth_place"
              horizontal
          />
          <CInput
              label="Tanggal Lahir Istri"
              placeholder="Masukkan tanggal lahir istri"
              v-model="maritals.wife_birth_date"
              type="date"
              horizontal
          />
          <CInput
              label="Kewarganegaran Istri"
              placeholder="Masukkan kewarganegaraan istri"
              v-model="maritals.wife_nationality"
              horizontal
          />
          <CInput
              label="Agama Istri"
              placeholder="Masukkan agama istri"
              v-model="maritals.wife_religion"
              horizontal
          />
          <CInput
              label="Alamat"
              placeholder="Masukkan alamat"
              v-model="maritals.address"
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
                      v-model="select.neighbourhoodId"
                      placeholder="Pilih RT"
                      :options="list.neighbourhoodList"
                      :reduce="neighbourhood => neighbourhood.id"
                      class="col-sm-9 p-0">
            </v-select>
          </div>
          <CInput
              label="Nomor Akta Perkawinan"
              placeholder="Masukkan nomor akta perkawinan"
              v-model="maritals.marital_number"
              horizontal
          />
          <CInput
              label="Nomor Seri Perkawinan"
              placeholder="Masukkan nomor seri perkawinan"
              v-model="maritals.marital_serial_number"
              horizontal
          />
          <CInput
              label="Tanggal Perkawinan"
              placeholder="Masukkan tanggal perkawinan"
              v-model="maritals.married_date"
              type="date"
              horizontal
          />
          <CInput
              label="Tempat Perkawinan"
              placeholder="Masukkan tempat perkawinan"
              v-model="maritals.married_place"
              horizontal
          />
          <CInputFile
              class="my-3"
              label="Foto Akta Perkawinan"
              horizontal
              @change="onFileChange($event, 'letter')"
          />
          <CInputFile
              class="my-3"
              label="Foto Buku Nikah Suami"
              horizontal
              @change="onFileChange($event, 'bookHusband')"
          />
          <CInputFile
              class="my-3"
              label="Foto Buku Nikah Istri"
              horizontal
              @change="onFileChange($event, 'bookWife')"
          />
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton class="mr-2" type="submit" size="sm" color="info" @click="createMarital">Submit</CButton>
        <CButton type="reset" size="sm" color="primary" @click="$router.go(-1)">Kembali</CButton>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import {notyError, notySuccess} from "../../utils/noty";
import {maritalApiCreate} from "../../api/maritalApi";
import {
  locationApiCityList,
  locationApiDistrictList, locationApiNeighbourhoodList,
  locationApiProvinceList,
  locationApiVillageList
} from "../../api/locationApi";
import {validate} from "../../utils/validator";

export default {
  name: "Create",
  data: () => ({
    maritals: {
      marital_number: '',
      marital_serial_number: '',
      married_date: '',
      married_place: '',
      husband_name: '',
      husband_nik: '',
      husband_birth_place: '',
      husband_birth_date: '',
      husband_nationality: '',
      husband_religion: '',
      wife_name: '',
      wife_nik: '',
      wife_birth_place: '',
      wife_birth_date: '',
      wife_nationality: '',
      wife_religion: '',
      address: '',
      marital_attachment: '',
      husband_marital_attachment: '',
      wife_marital_attachment: '',
      neighbourhood_id: ''
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
    async createMarital() {
      let fd = new FormData();

      fd.append("marital_number", this.maritals.marital_number)
      fd.append("marital_serial_number", this.maritals.marital_serial_number)
      fd.append("married_date", this.maritals.married_date)
      fd.append("married_place", this.maritals.married_place)
      fd.append("husband_name", this.maritals.husband_name)
      fd.append("husband_nik", this.maritals.husband_nik)
      fd.append("husband_birth_place", this.maritals.husband_birth_place)
      fd.append("husband_birth_date", this.maritals.husband_birth_date)
      fd.append("husband_nationality", this.maritals.husband_nationality)
      fd.append("husband_religion", this.maritals.husband_religion)
      fd.append("wife_name", this.maritals.wife_name)
      fd.append("wife_nik", this.maritals.wife_nik)
      fd.append("wife_birth_place", this.maritals.wife_birth_place)
      fd.append("wife_birth_date", this.maritals.wife_birth_date)
      fd.append("wife_nationality", this.maritals.wife_nationality)
      fd.append("wife_religion", this.maritals.wife_religion)
      fd.append("address", this.maritals.address)
      fd.append("marital_attachment", this.maritals.marital_attachment)
      fd.append("husband_marital_attachment", this.maritals.husband_marital_attachment)
      fd.append("wife_marital_attachment", this.maritals.wife_marital_attachment)
      fd.append("neighbourhood_id", this.select.neighbourhoodId)

      try {
        await maritalApiCreate(fd, this.$store.getters.auth.token)
        notySuccess("Berhasil mengajukan pekawinan")
        this.$router.go("/perkawinan")
      } catch (e) {
        validate(e.message)
      }
    },
    onFileChange(e, type) {
      console.log(e)
      switch (type) {
        case 'letter':
          this.maritals.marital_attachment = e[0]
          break
        case 'bookHusband':
          this.maritals.husband_marital_attachment = e[0]
          break
        case 'bookWife':
          this.maritals.wife_marital_attachment = e[0]
          break
      }
    }
  },
  async mounted() {
    await this.fetchProvince()
  }
}
</script>

<style scoped>

</style>