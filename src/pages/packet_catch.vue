<template>
  <div class="layout">
    <div class="layout-breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>捕获数据包</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="layout-content">内容</div>
  </div>
</template>

<script>
export default {
  name: "packet",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 1000px) {
  .layout {
    &-breadcrumb {
      padding: 0 0 20px 0;
    }
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
    &-breadcrumb {
      padding: 0 0 20px 0;
    }
    &-content {
      min-height: 700px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
    }
  }
}
</style>