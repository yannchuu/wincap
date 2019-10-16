<template>
  <div class="layout">
    <div class="layout-content">
      <div class="layout-myChart" ref="myChart"></div>
      <div class="layout-device">
        <el-card class="box-card" shadow="hover">
          <div class="box-card-content" v-for="(device,i) in deviceData" :key="i">
            <div class="box-card-content-name">
              <i class="el-icon-upload"></i>
              <el-tooltip class="item" effect="dark" content="查看设备信息" placement="top-end">
                <a href="javascript:void(0)" v-on:click="getInterfaces(device.name)">{{device.name}}</a>
              </el-tooltip>
            </div>
            <div class="box-card-content-info">
              <span>Interface Counts: {{device.interfaces.length}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>IP: {{device.ip_address}}</span>
              <el-divider direction="vertical"></el-divider>
              <span>Flow: &nbsp</span>
              <el-tooltip class="item" effect="dark" content="查看流量分析" placement="right-start">
                <a href="javascript:void(0)" v-on:click="netflow(device.name)">{{flow}}</a>
              </el-tooltip>
            </div>
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
  name: "index",
  data() {
    return {
      flow: 0
    };
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
      // this.getNetFlowData();
      this.getDeviceInfo();
      var myChart = this.$echarts.init(this.$refs.myChart);
      var option = {
        title: {
          text: "服务器流量统计",
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
          option.legend.data = Object.keys(netflow.devices);
          for (var key in netflow.devices) {
            netflow.devices[key].sort(function(a, b) {
              return a.time - b.time;
            });
            var data = [];
            netflow.devices[key].map(v => {
              this.flow += v.length;
              data.push(v.length);
            });
            let se = {
              name: key,
              type: "bar",
              data: data,
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
  color: #409eff;
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
    margin: 50px 0px 20px 100px;
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