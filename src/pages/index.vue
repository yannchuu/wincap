<template>
  <div class="layout">
    <div class="layout-content">
      <div class="layout-table"></div>
      <div class="layout-device">
        <el-card class="box-card" shadow="hover">
          <div class="box-card-content" v-for="(device,i) in deviceData" :key="i">
            <div class="box-card-content-name">
              <i class="el-icon-upload"></i>
              <!-- <el-link type="info">{{device.name}}</el-link> -->
              <a href="javascript:void(0)" v-on:click="getInterfaces(device.name)">{{device.name}}</a>
              <!-- <a href="javascript:void(0)">{{device.name}}</a> -->
            </div>
            <div class="box-card-content-info">
              <span>Interface Counts: {{device.interfaces.length}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>IP: {{device.ip_address}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>Flow: &nbsp</span>
              <a href="javascript:void(0)" v-on:click="netflow(device.name)">netflow</a>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "index",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      deviceData(state) {
        return state.device.device;
      }
    })
  },
  methods: {
    getInterfaces(device) {
      this.$router.push({ path: "/devices", query: { device: device } });
    },
    netflow(device) {
      this.$router.push({ path: "/netflow", query: { device: device } });
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

.el-icon-upload {
  padding-right: 8px;
}

.box-card {
  width: 600px;
  &-content {
    color: #555555;
    margin: 0 0 10px;
    &-name {
      font: 13px Lato;
      font-weight: bold;
      margin: 0 0 5px;
    }
    &-info {
      font: 13px Lato;
    }
  }
}
</style>