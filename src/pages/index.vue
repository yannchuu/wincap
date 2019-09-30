<template>
  <div class="layout">
    <div class="layout-content">content</div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      orgOptions: {}
    };
  },
  mounted() {}
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