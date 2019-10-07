<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="layout-logo">
          <span>Network Analysis</span>
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
  methods: {}
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 1000px) {
  .el-main {
    position: absolute;
    left: 0;
    right: 0;
    min-height: 900px;
    margin-top: 52px;
    overflow: hidden;
    background: #f5f7f9;
    border-radius: 4px;
  }
}

@media screen and (max-width: 1000px) {
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
}

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
