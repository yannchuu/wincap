<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="header-left">xxx</div>
        <div class="header-center">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3">消息中心</el-menu-item>
          </el-menu>
        </div>
        <div class="header-right">xxx</div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
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
    handleSelect() {}
  }
};
</script>

<style lang="less" scoped>
html,
body {
  height: 100%;
  color: #000;
}
#app {
  width: 100%;
  height: 100%;
}

.el-header {
  background-color: #545c64;
  z-index: 99;
  padding: 0 !important;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  height: 100%;
  display: flex;
  align-items: center;
}
.el-footer {
  /* background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
