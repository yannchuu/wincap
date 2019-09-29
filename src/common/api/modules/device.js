import http from '@/common/api/http';
import { GET } from '../methods';

export default {
    getDeviceInfo: async function (payload) {
        const res = await http({
            url: `http://49.232.16.9:8080/getDeviceInfo`,
            method: GET,
            data: {
                ...payload,
            },
        });
        console.log(res)
        return res.data;
    },
}