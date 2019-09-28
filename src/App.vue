<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="layout-logo">
          <span>Network Analysis</span>
        </div>
        <div class="layout-nav">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-info"></i>
                <span>设备信息</span>
              </template>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我的工作台</span>
              </template>
              <el-menu-item index="2-1">
                <template slot="title">
                  <i class="el-icon-folder"></i>
                  <span>捕获数据包</span>
                </template>
              </el-menu-item>
              <el-menu-item index="2-2">
                <template slot="title">
                  <i class="el-icon-upload"></i>
                  <span>统计数据包</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>流量统计</span>
              </template>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="layout-user">
          <el-dropdown>
            <el-avatar
              class="el-dropdown-link"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-check">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
        <div class="layout-copy">2018-2019 &copy; NetworkData</div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    handleSelect(index, indexPath) {
      switch (index) {
        case "1":
          this.$router.push("/devices");
          break;
        case "2-1":
          this.$router.push("/packet/catch");
          break;
        case "2-2":
          this.$router.push("/packet/analysis");
          break;
        case "3":
          this.$router.push("/netflow");
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #545c64;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-main {
  position: absolute;
  left: 0;
  right: 0;
  min-height: 800px;
  margin-top: 52px;
  overflow: hidden;
  background: #f5f7f9;
  border-radius: 4px;
}

.layout {
  &-logo {
    font-family: "Helvetica Neue";
    font-size: 18px;
    color: #c3cbd6;
    line-height: 30px;
  }
  &-copy {
    text-align: center;
    padding: 15px 0 0 0;
    color: #9ea7b4;
  }
}
</style>
