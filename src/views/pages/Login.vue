<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Masuk</h1>
                  <p class="text-muted">Masuk ke akun anda</p>
                  <CInput
                    placeholder="NIK"
                    autocomplete="username email"
                    v-model="form.nik"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Kata Sandi"
                    type="password"
                    autocomplete="curent-password"
                    v-model="form.password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="info" class="px-4" @click="userLogin">Masuk</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="info"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h4>Belum memiliki akun?</h4>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                  class="mt-3"
                  @click="$router.push('/user/buat')"
                >
                  Daftar sekarang!
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import {notyError, notySuccess} from "../../utils/noty";

export default {
  name: 'Login',
  data: () => ({
    form: {
      nik: '',
      password: ''
    }
  }),
  methods: {
    async userLogin() {
      try {
        await this.$store.dispatch('authLogin', this.form)
        notySuccess("Login berhasil")
        this.$router.push('/home')
      } catch (e) {
        console.log(e)
        notyError("NIK atau password salah")
      }
    }
  }
}
</script>