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
          <div slot="header">
            <span>{{device}}</span>
          </div>
          <div class="box-card-content" v-for="(intf,i) in interfaceData" :key="i">
            <div class="box-card-content-name">
              <a href="javascript:viod(0)" v-on:click="packetCatch(intf.name)">{{intf.name}}</a>
            </div>
            <div class="box-card-content-info">
              <span>Description: {{intf.description == ""? "无":intf.description}}</span>
              <br />
              <div v-if="intf.addresses.length > 0">
                <span>Addresses:</span>
                <div v-for="(ad,k) in intf.addresses" :key="k" style="margin-left:10px;">
                  <span>IP: {{ad.ip == ""? "无":ad.ip}}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>Subnet Mask: {{ad.subnet_mask}}</span>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
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
    return {
      device: this.$route.query.device
    };
  },
  computed: {
    ...mapState({
      interfaceData(state) {
        let interfaces = [];
        state.device.device.map(v => {
          if (v.name === this.device) {
            interfaces = v.interfaces;
          }
        });
        return interfaces;
      }
    })
  },
  methods: {
    packetCatch(intf) {
      this.$router.push({ path: "/packet/catch", query: { interface: intf } });
    },
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

.box-card {
  width: 600px;
  &-content {
    color: #555555;
    margin: 0 0 10px;
    &-name {
      font: 15px Lato;
      font-weight: bold;
      margin: 0 0 2px;
    }
    &-info {
      font: 13px Lato;
    }
  }
}

.el-divider--horizontal {
  margin: 20px 0;
}
</style>