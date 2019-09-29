<template>
  <div class="layout">
    <div class="layout-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>设备信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="layout-content">
      <span>{{host.name}}</span>
      <div v-for="item in host.devices" :key="item.name">
        <span>{{item.name}}</span>
        <span>{{item.description}}</span>
        <div v-for="addr in item.addresses" :key="addr.ip">
          <span>{{addr.ip}}</span>
          <span>{{addr.subnet_mask}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import device from "@/common/api/modules/device";

export default {
  name: "device",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      host(state) {
        return state.device;
      }
    })
  },
  methods: {
    init() {
      this.getDeviceInfo();
    },
    ...mapActions(["getDeviceInfo"])
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.layout {
  &-breadcrumb {
    padding: 0 0 20px 0;
  }
  &-content {
    min-height: 700px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
}
</style>