<template>
  <div class="layout">
    <div class="layout-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>流量分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="layout-content">
      <div>
        <div class="layout-inChart" ref="inChart"></div>
        <div class="layout-tcpChart" ref="tcpChart"></div>
      </div>
      <div class="layout-omChart" ref="omChart"></div>
    </div>
  </div>
</template>

<script>
import api from "@/common/api/modules/device";

export default {
  name: "netflow",
  data() {
    return {
      device: this.$route.query.device
    };
  },
  methods: {
    init() {
      var tcpChart = this.$echarts.init(this.$refs.tcpChart);
      var tcpOption = {
        title: {
          text: "协议流量分析",
          subtext: "以上数据来源于2019",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "协议",
            type: "pie",
            radius: [30, 110],
            center: ["50%", "50%"],
            roseType: "area",
            data: []
          }
        ]
      };

      var inChart = this.$echarts.init(this.$refs.inChart);
      var inOption = {
        title: {
          text: "接口流量分析",
          subtext: "以上数据来源于2019",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "协议流量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      var omChart = this.$echarts.init(this.$refs.omChart);
      var omOption = {
        legend: {},
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: "axis",
          showContent: false
        },
        dataset: {
          source: [
            [
              "category",
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
          ]
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { top: "55%" },
        series: [
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          {
            type: "pie",
            id: "pie",
            radius: "30%",
            center: ["50%", "25%"],
            label: {
              formatter: "{b}: {@1月} ({d}%)"
            },
            encode: {
              itemName: "category",
              value: "1月",
              tooltip: "1月"
            }
          }
        ]
      };

      api.getNetFlowData().then(res => {
        if (res.errcode === 0) {
          var netflow = JSON.parse(res.data);
          var key = this.device;
          inOption.legend.data = Object.keys(
            netflow.devices[key][0].interfaces
          );
          netflow.devices[key].sort(function(a, b) {
            return a.time - b.time;
          });
          console.log(netflow.devices[key]);

          for (var i in netflow.devices[key][0].interfaces) {
            inOption.series[0].data.push({ name: i, value: 0 });
            omOption.dataset.source.push([i]);
          }

          netflow.devices[key].map(d => {
            for (var t in d.interfaces) {
              inOption.series[0].data.map(s => {
                if (s.name == t) {
                  s.value += d.interfaces[t].length;
                }
              });
              omOption.dataset.source.map(s => {
                if (s[0] == t) {
                  s.push(d.interfaces[t].length);
                }
              });
              for (var p in d.interfaces[t].protocols) {
                if (tcpOption.series[0].data.length == 0) {
                  tcpOption.series[0].data.push({
                    name: p,
                    value: d.interfaces[t].protocols[p]
                  });
                } else {
                  var i = 0;
                  tcpOption.series[0].data.map(s => {
                    if (s.name == p) {
                      s.value += d.interfaces[t].protocols[p];
                    } else {
                      i++;
                    }
                  });
                  if (i == tcpOption.series[0].data.length) {
                    tcpOption.series[0].data.push({
                      name: p,
                      value: d.interfaces[t].protocols[p]
                    });
                  }
                }
              }
            }
          });
          tcpOption.series[0].data.map(l => {
            tcpOption.legend.data.push(l.name);
          });

          // netflow.devices[key].map(v => {
          //   for (var i in v.interfaces) {
          //     option.series.map(s => {
          //       if (i == s.name) {
          //         s.data.push(v.interfaces[i].length);
          //       }
          //     });
          //   }
          // });
          tcpChart.setOption(tcpOption);
          inChart.setOption(inOption);
          omChart.setOption(omOption);
        }
      });
      tcpChart.setOption(tcpOption);
      inChart.setOption(inOption);
      omChart.on("updateAxisPointer", function(event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo != undefined) {
          var dimension = xAxisInfo.value + 1;
          omChart.setOption({
            series: {
              id: "pie",
              label: {
                formatter: "{b}: {@[" + dimension + "]} ({d}%)"
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          });
        }
      });
      omChart.setOption(omOption);
    }
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

.layout {
  &-breadcrumb {
    padding: 0 0 20px 0;
  }
  &-tcpChart {
    width: 600px;
    height: 400px;
    margin: 25px 0 50px 70px;
  }
  &-inChart {
    width: 600px;
    height: 400px;
    margin: 25px 0 20px 70px;
  }
  &-omChart {
    width: 900px;
    height: 600px;
    margin: 120px 0 20px 180px;
  }
}
</style>