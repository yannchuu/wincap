<template>
  <div class="layout">
    <div class="layout-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>设备信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="layout-content">
      <div class="layout-table"></div>
      <div class="layout-device">
        <el-card class="box-card" shadow="hover">
          <el-collapse accordion>
            <el-collapse-item v-for="(device,i) in hostData" :key="i">
              <template slot="title">
                <i class="el-icon-upload"></i>
                {{device.name}}
              </template>
              <span>IP: {{device.ip_address}}</span>
              <br />
              <span>Interfaces:</span>
              <br />
              <div class="device-interfaces">
                <el-collapse>
                  <el-collapse-item v-for="(intf,j) in device.interfaces" :key="j">
                    <template slot="title">{{intf.name}}</template>
                    <span>Description: {{intf.description == ""? "无":intf.description}}</span>
                    <br />
                    <span>Addresses:</span>
                    <br />
                    <div v-if="intf.addresses.length > 0">
                      <div
                        class="device-interfaces-addresses"
                        v-for="(ad,k) in intf.addresses"
                        :key="k"
                      >
                        <span>IP: {{ad.ip == ""? "无":ad.ip}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>Subnet Mask: {{ad.subnet_mask}}</span>
                      </div>
                    </div>
                    <div v-else>
                      <span>无</span>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "device",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      hostData(state) {
        return state.device.device;
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
@media screen and (min-width: 1000px) {
  .layout {
    &-content {
      min-height: 800px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .layout {
    &-content {
      min-height: 700px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
    }
  }
}

.layout {
  &-breadcrumb {
    padding: 0 0 20px 0;
  }
  &-device {
    position: relative;
    margin: 20px 0 20px 5px;
  }
}

.el-icon-upload {
  padding: 0 8px;
}

.box-card {
  width: 600px;
}

.device-interfaces {
  margin-left: 13px;
  // height: 30px !important;
  &-addresses {
    margin-left: 26px;
  }
}
</style>