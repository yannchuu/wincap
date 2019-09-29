import http from '@/common/api/http';
import { POST } from '../methods';

export default {
    login: async function (payload) {
        const res = await http({
            // url: `${BASE_URL}/api/r/login_sign/Login`,
            url: `${BASE_URL}/api/r/easylogin/Login`,
            method: POST,
            data: {
                ...payload,
            },
        });
        return res.data;
    },
}