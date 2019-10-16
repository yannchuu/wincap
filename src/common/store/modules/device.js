import device from '@/common/api/modules/device'

const state = {
    device: [],
};

const actions = {
    getDeviceInfo({ commit }, opt) {
        const payload = opt;
        device.getDeviceInfo(payload).then(res => {
            if (res.errcode === 0) {
                commit("getDeviceInfo", res.data)
            } else {
                console.log('数据加载异常，请重试');
            }
        }).catch(error => {
            console.log(`${error}数据加载异常，请重试`);
        });
    },
};

const mutations = {
    getDeviceInfo: (state, result) => {
        state.device = JSON.parse(result)
    },
};

export default {
    state,
    actions,
    mutations,
};