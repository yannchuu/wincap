<template>
  <div class="layout">
    <div class="layout-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/devices', query: { device: device } }">设备信息</el-breadcrumb-item>
        <el-breadcrumb-item>捕获数据包</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="layout-content">
      <div class="layout-packet">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{intf}}</span>
            <el-button
              type="success"
              icon="el-icon-caret-right"
              circle
              style="float: right;"
              size="mini"
              @click="Open"
            ></el-button>
          </div>
          <el-collapse>
            <el-collapse-item
              :title="'Packet ' + i + ': ' + packet.wire +' on wire, ' + packet.point"
              class="box-card-content"
              v-for="(packet,i) in PacketData"
              :key="i"
            >
              <div class="box-card-content-info">
                <span>- CapLength: {{packet.cap}}</span>
                <br />
                <span>- Time: {{packet.time}}</span>
                <br />
                <span>- All Packet Layer:</span>
                <div v-for="(layer,j) in packet.layer" :key="j" style="margin-left:10px;">
                  <br />
                  <span>· {{layer}}</span>
                  <br />
                </div>
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
  name: "packet",
  data() {
    var ws;
    return {
      search: "",
      device: this.$route.query.device,
      intf: this.$route.query.interface
    };
  },
  computed: {
    ...mapState({
      PacketData(state) {
        return state.device.packet.map((v, i) => {
          return {
            ...v,
            id: i + 1,
            wire: v.wire + " bytes",
            cap: v.cap + " bytes"
          };
        });
      }
    })
  },
  methods: {
    Open() {
      if (this.ws) {
        return false;
      }
      this.ws = new WebSocket("ws://49.232.16.9:8080/packetCatchInfo");
      this.ws.onopen = this.websocketonopen;
      this.ws.onmessage = this.websocketonmessage;
    },
    websocketonopen() {
      console.log("建立连接成功！");
      this.ws.send(this.intf);
    },
    websocketonmessage(e) {
      console.log(e);
    },
    init() {
      let postload = { interface: this.intf };
      this.packetCatchInfo(postload);
    },
    ...mapActions(["packetCatchInfo"])
  },
  mounted() {
    // this.init();
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
  &-packet {
    position: relative;
    margin: 20px 0 20px 5px;
  }
}

.box-card {
  width: 1000px;
  &-content {
    // color: #555555;
    // margin: 0 0 10px;
    &-info {
      font: 13px Lato;
    }
  }
}
</style>