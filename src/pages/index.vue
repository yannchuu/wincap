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
.layout {
  &-breadcrumb {
    padding: 0 0 20px 0;
  }
  &-content {
    min-height: 750px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
}
</style>