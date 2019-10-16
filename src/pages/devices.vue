<template>
  <div class="layout">
    <div class="layout-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>设备信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="layout-content">
      <div class="layout-myChart" ref="myChart"></div>
      <div class="layout-device">
        <el-card class="box-card" shadow="hover">
          <div slot="header">
            <span>{{device}}</span>
          </div>
          <div class="box-card-content" v-for="(intf,i) in interfaceData" :key="i">
            <div class="box-card-content-name">
              <el-tooltip class="item" effect="dark" content="捕获数据包" placement="right">
                <a
                  href="javascript:void(0)"
                  v-on:click="packetCatch(device,intf.name)"
                >{{intf.name}}</a>
              </el-tooltip>
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
import api from "@/common/api/modules/device";

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
    packetCatch(device, intf) {
      this.$router.push({
        path: "/packet/catch",
        query: { device: device, interface: intf }
      });
    },

    init() {
      this.getDeviceInfo();
      var myChart = this.$echarts.init(this.$refs.myChart);
      var option = {
        title: {
          text: "接口流量统计",
          subtext: "以上数据统计截止至2019年"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          //x轴(设备)
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          //y轴
          {
            type: "value"
          }
        ],
        series: []
      };
      api.getNetFlowData().then(res => {
        if (res.errcode === 0) {
          var netflow = JSON.parse(res.data);
          var key = this.device;
          option.legend.data = Object.keys(netflow.devices[key][0].interfaces);
          netflow.devices[key].sort(function(a, b) {
            return a.time - b.time;
          });

          for (var i in netflow.devices[key][0].interfaces) {
            let se = {
              name: i,
              type: "bar",
              data: [],
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              },
              markLine: {
                data: [{ type: "average", name: "平均值" }]
              }
            };
            option.series.push(se);
          }

          netflow.devices[key].map(v => {
            for (var i in v.interfaces) {
              option.series.map(s => {
                if (i == s.name) {
                  s.data.push(v.interfaces[i].length);
                }
              });
            }
          });
          myChart.setOption(option);
        }
      });
      myChart.setOption(option);
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
      display: flex;
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
      display: flex;
    }
  }
}

a {
  color: #555555;
  text-decoration: none;
}

.layout {
  &-breadcrumb {
    padding: 0 0 20px 0;
  }
  &-myChart {
    margin: 25px 0 20px 30px;
    width: 910px;
    height: 600px;
  }
  &-device {
    position: relative;
    margin: 50px 0px 20px 90px;
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