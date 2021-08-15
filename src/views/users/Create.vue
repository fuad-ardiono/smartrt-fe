<template>
  <div>
    <CCard>
      <CCardHeader>
        Register
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CInput
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              v-model="users.name"
              horizontal
          />
          <CInput
              label="Email"
              placeholder="Masukkan email"
              v-model="users.email"
              horizontal
          />
          <CInput
              label="Nomor Telepon"
              placeholder="Masukkan nomor telepon"
              v-model="users.phone"
              horizontal
          />
          <CInput
              label="Jabatan/Pekerjaan"
              placeholder="Masukkan jabatan/pekerjaan"
              v-model="users.position"
              horizontal
          />
          <CInput
              label="NIK"
              placeholder="Masukkan NIK"
              description="Minimal NIK 16 karakter"
              v-model="users.nik"
              horizontal
          />
          <CInput
              label="Password"
              type="password"
              placeholder="Masukkan password"
              description="Minimal password 8 karakter"
              v-model="users.password"
              horizontal
          />
          <CInput
              label="Konfirmasi Password"
              type="password"
              placeholder="Masukkan password"
              description="Password harus sama"
              v-model="users.password_confirmation"
              horizontal
          />
          <CInput
              label="Alamat"
              type="type"
              placeholder="Masukkan alamat"
              v-model="users.address"
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
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton class="mr-2" type="submit" size="sm" color="info" @click="createUser">Register</CButton>
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
import {authApiCreateUser} from "../../api/authApi";

export default {
  name: "Create",
  data: () => ({
    users: {
      name: '',
      email: '',
      phone: '',
      position: '',
      nik: '',
      address: '',
      neighbourhood: '',
      village: '',
      district: '',
      city: '',
      province: '',
      password: '',
      password_confirmation: '',
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
    async createUser() {
      try {
        this.users.neighbourhood_id = this.select.neighbourhoodId
        await authApiCreateUser(this.users, this.$store.getters.auth.token)
        notySuccess("Register user berhasil")
        await this.$router.push('/home')
      } catch (e) {
        validate(e.message)
      }
    },
  },
  async mounted() {
    await this.fetchProvince()
  }
}
</script>

<style scoped>

</style>