<template>
  <CCard>
    <CRow>
      <CCol>
        <CCardHeader>
          Review Perceraian: {{ divorce.name }}
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
            <CTab title="Data Pengaju Cerai" active>
              <div class="my-3">
                <CRow class="m-1">
                  <p class="labelInput">Nama</p>
                  <p id="name"><span class="mr-3">:</span>{{ divorce.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">NIK</p>
                  <p id="nik"><span class="mr-3">:</span>{{ divorce.nik }}</p>
                </CRow>
                <CRow class="
            m-1">
                  <p class="labelInput">Tempat Lahir</p>
                  <p id="birthplace"><span class="mr-3">:</span>{{ divorce.birth_place }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Tanggal Lahir</p>
                  <p id="birthDateHusband"><span class="mr-3">:</span>{{ divorce.birth_date }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Agama</p>
                  <p id="religionHusband"><span class="mr-3">:</span>{{ divorce.religion }}</p>
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
            <CTab title="Data Perceraian">
              <div class="my-3" style="max-width: 100%">
                <CRow class="m-1">
                  <p class="labelInput">Nomor Akta Perceraian</p>
                  <p id="divorceNumber"><span class="mr-3">:</span>{{ divorce.divorce_number }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Nomor Serial Perceraian</p>
                  <p id="divorceSerialNumber"><span class="mr-3">:</span>{{ divorce.divorce_serial_number }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Tempat Perceraian</p>
                  <p id="divorcePlace"><span class="mr-3">:</span>{{ divorce.divorce_place }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Nomor Pernikahan</p>
                  <p id="maritalNumber"><span class="mr-3">:</span>{{ divorce.marital_number }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Surat Perceraian</p>
                  <p id="divorceAttachment"><span class="mr-3">:</span><img width="200" height="200" :src="divorce.attachment" alt=""></p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Provinsi</p>
                  <p id="province"><span class="mr-3">:</span>{{ divorce.province.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Kota</p>
                  <p id="city"><span class="mr-3">:</span>{{ divorce.city.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Kecamatan</p>
                  <p id="district"><span class="mr-3">:</span>{{ divorce.district.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Kelurahan</p>
                  <p id="village"><span class="mr-3">:</span>{{ divorce.village.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Rukun Tetangga</p>
                  <p id="neighbourhood"><span class="mr-3">:</span>{{ divorce.neighbourhood.name }}</p>
                </CRow>
                <CRow class="m-1">
                  <p class="labelInput">Alamat</p>
                  <p id="address"><span class="mr-3">:</span>{{ divorce.address }}</p>
                </CRow>
              </div>
            </CTab>
          </CTabs>
        </CCardBody>
        <div class="container mt-n2 ml-2">
          <h5>STATUS : {{ divorce.status.status }}</h5>
        </div>
        <div class="container py-3 pb-4" v-if="$store.getters.isRoleAdmin">
          <CButton class="mx-1" color="success" @click="approveDivorce(divorce.id)">Approve</CButton>
          <CButton class="mx-1" color="info" @click="waitingDivorce(divorce.id)">Waiting</CButton>
          <CButton class="mx-1" color="danger" @click="rejectDivorce(divorce.id)">Reject</CButton>
          <CButton class="mx-1" color="primary" @click="$router.go(-1)">Kembali</CButton>
        </div>
        <div class="container py-3 pb-4" v-else>
          <CButton class="mx-1" color="primary" @click="$router.go(-1)">Kembali</CButton>
        </div>
      </CCol>
    </CRow>
  </CCard>
</template>

<script>
import {notyError, notySuccess} from "../../utils/noty";
import {validate} from "../../utils/validator";
import {divorceApiDetail, divorceApiSetApprove, divorceApiSetReject, divorceApiSetWaiting} from "../../api/divorceApi";

export default {
  name: "Show",
  data: () => ({
    divorce: {}
  }),
  methods: {
    async approveDivorce(id) {
      try {
        await divorceApiSetApprove(id, this.$store.getters.auth.token)
        notySuccess("Sukses set approve perceraian")
        await this.fetchDivorce()
      } catch (e) {
        validate(e.message)
      }
    },
    async rejectDivorce(id) {
      try {
        await divorceApiSetReject(id, this.$store.getters.auth.token)
        notySuccess("Sukses set reject perceraian")
        await this.fetchDivorce()
      } catch (e) {
        validate(e.message)
      }
    },
    async waitingDivorce(id) {
      try {
        await divorceApiSetWaiting(id, this.$store.getters.auth.token)
        notySuccess("Sukses set waiting perceraian")
        await this.fetchDivorce()
      } catch (e) {
        validate(e.message)
      }
    },
    async fetchDivorce() {
      try {
        const { divorce } = await divorceApiDetail(this.$route.params.id, this.$store.getters.auth.token)
        this.divorce = divorce

        if (this.$store.getters.auth.user.role.name === 'user') {
          if (divorce.user.id !== this.$store.getters.auth.user.id) {
            this.$router.go(-1)
          } else {
            this.isValidated = true
          }
        } else {
          this.isValidated = true
        }

        this.divorce.attachment = this.generateUrlImage(divorce.attachment)
      } catch (e) {
        notyError("Gagal fetch detail perceraian")
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
    this.fetchDivorce()
  }
}
</script>

<style scoped>

</style>