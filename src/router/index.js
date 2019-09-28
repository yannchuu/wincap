import Vue from 'vue'
import Router from 'vue-router'

import index from '@/pages/index';
import device from '@/pages/devices';
import netflow from '@/pages/netflow';
import packet_catch from '@/pages/packet_catch';
import packet_analysis from '@/pages/packet_analysis';

Vue.use(Router)

export default new Router({
    routes: [
        {
            name: 'index',
            path: '/',
            component: index
        },
        {
            name: 'device',
            path: '/devices',
            component: device
        },
        {
            name: 'netflow',
            path: '/netflow',
            component: netflow
        },
        {
            name: 'packet_catch',
            path: '/packet/catch',
            component: packet_catch
        },
        {
            name: 'packet_analysis',
            path: '/packet/analysis',
            component: packet_analysis
        }
    ]
})