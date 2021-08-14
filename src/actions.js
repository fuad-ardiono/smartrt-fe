import {authApiCurrentUser, authApiLogin} from "./api/authApi";
import { navSuperAdmin } from "./containers/_navSuperAdmin";
import { navUser } from "./containers/_navUser";

export default {
    async authLogin({dispatch, commit, getters}, data) {
        try {
            const loginResponse = await authApiLogin(data)
            const authData = getters.auth

            authData.token = loginResponse.content.access_token
            authData.authenticated = true

            commit('AUTH_SET_AUTH_DATA', authData)
            await dispatch('authGetUser')
        } catch (e) {
            commit('AUTH_RESET_AUTH_DATA')
            throw e
        }
    },
    async authGetUser({commit, getters, dispatch}) {
        try {
            let getUserResponse = await authApiCurrentUser(getters.auth.token)

            const authData = getters.auth
            authData.user = getUserResponse

            commit('AUTH_SET_AUTH_DATA', authData)
            dispatch('setSidebarList')
        } catch (e) {
            commit('AUTH_RESET_AUTH_DATA')
            throw e
        }
    },
    authLogout({commit, dispatch}) {
        commit('AUTH_RESET_AUTH_DATA')
        dispatch('setSidebarList')
    },
    setSidebarList({commit, getters}) {
        if (getters.auth.authenticated) {
            switch (getters.auth.user.role.name) {
                case 'superadmin':
                    commit('SIDEBAR_SET_LIST', navSuperAdmin)
                    break
                case 'admin':
                    commit('SIDEBAR_SET_LIST', navUser)
            }
        } else {
            commit('SIDEBAR_SET_LIST', navUser)
        }
    }
}