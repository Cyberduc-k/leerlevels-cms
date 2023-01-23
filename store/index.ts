import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { setToken } from '@/src/axios';
import { post } from '@/src/requests';
import { get } from '@/src/requests';
import { User } from '@/src/User';

export const state = () => {
    const authToken = sessionStorage.getItem("authToken") ?? "";
    const authTokenExpiresAt = sessionStorage.getItem("authTokenExpiresAt") ?? "";
    const refreshToken = sessionStorage.getItem("refreshToken") ?? "";
    const refreshTokenExpiresAt = sessionStorage.getItem("refreshTokenExpiresAt") ?? "";
    const stateUser = JSON.parse(sessionStorage.getItem("stateUser") ?? "{}");

    if (authToken) {
        setToken(authToken);
    }

    return {
        authToken,
        authTokenExpiresAt,
        refreshToken,
        refreshTokenExpiresAt,
        stateUser: <User>stateUser,
    };
};

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
    getAuthToken(state) {
        return state.authToken;
    },
    getAuthTokenExpiresAt(state) {
        return state.authTokenExpiresAt;
    },
    getRefreshToken(state) {
        return state.refreshToken;
    },
    getRefreshTokenExpiresAt(state) {
        return state.refreshTokenExpiresAt;
    },
    getStateUser(state) {
        return state.stateUser;
    }
};

export const mutations: MutationTree<RootState> = {
    setToken(state, token) {
        state.authToken = token;
        sessionStorage.setItem("authToken", token);
        setToken(token);
    },
    setAuthTokenExpiresAt(state, authTokenExpiresAt) {
        state.authTokenExpiresAt = authTokenExpiresAt;
        sessionStorage.setItem("authTokenExpiresAt", authTokenExpiresAt);
    },
    setRefreshToken(state, refreshToken) {
        state.refreshToken = refreshToken;
        sessionStorage.setItem("refreshToken", refreshToken);
    },
    setRefreshTokenExpiresAt(state, refreshTokenExpiresAt) {
        state.refreshTokenExpiresAt = refreshTokenExpiresAt;
        sessionStorage.setItem("refreshTokenExpiresAt", refreshTokenExpiresAt);
    },
    setStateUser(state, user) {
        state.stateUser = user;
        sessionStorage.setItem("stateUser", JSON.stringify(user));
    }
};

export const actions: ActionTree<RootState, RootState> = {
    async login({ }, details: { email: string, password: string }): Promise<boolean> {
        try {
            //const res: AxiosResponse<{ accessToken: string }> = await post('/login', details);
            //const res: AxiosResponse<{accessToken: string}> = await post('/login', details).then( (response) => { return res;});
            const res = await post('/login', details).then( (res) => { return JSON.parse(res.data)});
            this.commit('setToken', res.accessToken);
            this.commit('setAuthTokenExpiresAt', res.accessTokenExpiresAt);
            this.commit('setRefreshToken', res.initRefreshToken);
            this.commit('setRefreshTokenExpiresAt', res.initRefreshTokenExpiresAt);

            //const user: AxiosResponse<User> = await get('/users/user');
            const user = await get('/users/user').then( (user) => { return JSON.parse(user.data)});
            this.commit('setStateUser', user);

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
};