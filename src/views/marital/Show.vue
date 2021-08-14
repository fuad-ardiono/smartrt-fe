<template>
  <CCard>
    <CRow>
      <CCol>
        <CCardHeader>
          Review Perkawinan: {{ marital.husband_name }} & {{ marital.wife_name }}
          <div class="card-header-actions">
            <a
                href="https://coreui.io/vue/docs/components/tabs"
                class="card-header-action"
                rel="noreferrer noopener"
                target="_blank"
            >
            </a>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTabs>
            <CTab title="Data Suami & Data Istri" active>
              <div class="my-3">
                <div class="ml-1">
                  <p><b>Data Suami</b></p>
                </div>
                <CRow class="m-1">
                  <p class="labelInput">Nama</p>
                  <p id="nameHusband"><span class="mr-3">:</span>{{ marital.husband_name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">NIK</p>
                  <p id="nikHusband"><span class="mr-3">:</span>{{ marital.husband_nik }}</p>
                </CRow>
                <CRow class="
            m-1">
                  <p class="labelInput">Tempat Lahir</p>
                  <p id="birthplaceHusband"><span class="mr-3">:</span>{{ marital.husband_birth_place }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Tanggal Lahir</p>
                  <p id="birthDateHusband"><span class="mr-3">:</span>{{ marital.husband_birth_date }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Kewarganegaran</p>
                  <p id="nationalityHusband"><span class="mr-3">:</span>{{ marital.husband_nationality }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Agama</p>
                  <p id="religionHusband"><span class="mr-3">:</span>{{ marital.husband_religion }}</p>
                </CRow>
              </div>
              <div class="ml-1">
                <p><b>Data Istri</b></p>
              </div>
              <div class="my-3">
                <CRow class="m-1">
                  <p class="labelInput">Nama</p>
                  <p id="nameWife"><span class="mr-3">:</span>{{ marital.wife_name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">NIK</p>
                  <p id="nikWife"><span class="mr-3">:</span>{{ marital.wife_nik }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Tempat Lahir</p>
                  <p id="birthplaceWife"><span class="mr-3">:</span>{{ marital.wife_birth_place }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Tanggal Lahir</p>
                  <p id="birthDateWife"><span class="mr-3">:</span>{{ marital.wife_birth_date }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Kewarganegaran</p>
                  <p id="nationalityWife"><span class="mr-3">:</span>{{ marital.wife_nationality }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Agama</p>
                  <p id="religionWife"><span class="mr-3">:</span>{{ marital.wife_religion }}</p>
                </CRow>
              </div>
            </CTab>
          </CTabs>
        </CCardBody>
      </CCol>
      <CCol>
        <CCardHeader class="mt-1">
          <p> </p>
        </CCardHeader>
        <CCardBody>
          <CTabs>
            <CTab title="Data Pernikahan">
              <div class="my-3" style="max-width: 100%">
                <CRow class="m-1">
                  <p class="labelInput">Nomor Akta Pernikahan</p>
                  <p id="maritalNumber"><span class="mr-3">:</span>{{ marital.marital_number }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Nomor Serial Pernikahan</p>
                  <p id="maritalSerialNumber"><span class="mr-3">:</span>{{ marital.marital_serial_number }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Tempat Pernikahan</p>
                  <p id="maritalPlace"><span class="mr-3">:</span>{{ marital.married_place }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Tanggal Pernikahan</p>
                  <p id="maritalDate"><span class="mr-3">:</span>{{ marital.married_date }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Buku Nikah Suami</p>
                  <p id="husbandMaritalAttachment"><span class="mr-3">:</span><img width="200" height="200" :src="marital.husband_marital_attachment" alt=""></p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Buku Nikah Istri</p>
                  <p id="wifeMaritalAttachment"><span class="mr-3">:</span><img width="200" height="200" :src="marital.wife_marital_attachment" alt=""></p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Surat Nikah</p>
                  <p id="maritalAttachment"><span class="mr-3">:</span><img width="200" height="200" :src="marital.marital_attachment" alt=""></p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Provinsi</p>
                  <p id="province"><span class="mr-3">:</span>{{ marital.province.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Kota</p>
                  <p id="city"><span class="mr-3">:</span>{{ marital.city.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Kecamatan</p>
                  <p id="district"><span class="mr-3">:</span>{{ marital.district.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Kelurahan</p>
                  <p id="village"><span class="mr-3">:</span>{{ marital.village.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Rukun Tetangga</p>
                  <p id="neighbourhood"><span class="mr-3">:</span>{{ marital.neighbourhood.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Alamat</p>
                  <p id="address"><span class="mr-3">:</span>{{ marital.address }}</p>
                </CRow>
              </div>
            </CTab>
          </CTabs>
        </CCardBody>
        <div class="container mt-n2 ml-2">
          <h5>STATUS : {{ marital.status.status }}</h5>
        </div>
        <div class="container py-3 pb-4" v-if="$store.getters.isRoleAdmin">
          <CButton class="mx-1" color="success" @click="approveMarital(marital.id)">Approve</CButton>
          <CButton class="mx-1" color="info" @click="waitingMarital(marital.id)">Waiting</CButton>
          <CButton class="mx-1" color="danger" @click="rejectMarital(marital.id)">Reject</CButton>
          <CButton class="mx-1" color="primary" @click="$router.go(-1)">Kembali</CButton>
        </div>
        <div v-else>
          <CButton class="mx-1" color="primary" @click="$router.go(-1)">Kembali</CButton>
        </div>
      </CCol>
    </CRow>
  </CCard>
</template>

<script>
import {notyError, notySuccess} from "../../utils/noty";
import {maritalApiDetail, maritalApiSetApprove, maritalApiSetReject, maritalApiSetWaiting} from "../../api/maritalApi";
import {validate} from "../../utils/validator";

export default {
  name: "Show",
  data: () => ({
    marital: {}
  }),
  methods: {
    async approveMarital(id) {
      try {
        await maritalApiSetApprove(id, this.$store.getters.auth.token)
        notySuccess("Sukses set approve perkawinan")
        await this.fetchMarital()
      } catch (e) {
        validate(e.message)
      }
    },
    async rejectMarital(id) {
      try {
        await maritalApiSetReject(id, this.$store.getters.auth.token)
        notySuccess("Sukses set reject perkawinan")
        await this.fetchMarital()
      } catch (e) {
        validate(e.message)
      }
    },
    async waitingMarital(id) {
      try {
        await maritalApiSetWaiting(id, this.$store.getters.auth.token)
        notySuccess("Sukses set waiting perkawinan")
        await this.fetchMarital()
      } catch (e) {
        validate(e.message)
      }
    },
    async fetchMarital() {
      try {
        const {marital} = await maritalApiDetail(this.$route.params.id, this.$store.getters.auth.token)

        if (this.$store.getters.auth.user.role.name === 'user') {
          if (marital.user.id !== this.$store.getters.auth.user.id) {
            this.$router.go(-1)
          } else {
            this.isValidated = true
          }
        } else {
          this.isValidated = true
        }

        this.marital = marital
        this.marital.marital_attachment = this.generateUrlImage(marital.marital_attachment)
        this.marital.husband_marital_attachment = this.generateUrlImage(marital.husband_marital_attachment)
        this.marital.wife_marital_attachment = this.generateUrlImage(marital.wife_marital_attachment)
      } catch (e) {
        notyError("Gagal fetch detail perkawinan")
      }
    },
    generateUrlImage(path) {
      let isContainFullUrlHttps = path.search("https")
      let isContainFullUrlHttp = path.search("http")
      console.log(isContainFullUrlHttp)

      if (isContainFullUrlHttp >= 0 || isContainFullUrlHttps >= 0) {
        return path
      } else {
        return process.env.VUE_APP_BASE_URL_IMAGE + path
      }
    },
  },
  mounted() {
    this.fetchMarital()
  }
}
</script>

<style scoped>

</style>