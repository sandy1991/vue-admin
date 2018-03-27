<template>
  <footer class="main-footer">
          <!-- To the right -->
          <div class="footer-version">
                版本号: {{ version }}
          </div>
          <!-- Default to the left -->
          <strong>Copyright &copy; {{ year }} <a :href="{ url }" target="_blank" class="info-url">{{ company }}</a>.</strong> All rights reserved.
    </footer>
</template>

<script>
export default {
  data() {
    return {
      version: "V1.0",
      year: 2018,
      url: "http://www.cnkrt.com/",
      company: "科睿特软件股份有限公司"
    };
  }
};
</script>


<style scoped="scoped">
.sidebar-collapse .main-footer {
  margin-left: 64px;
}
.main-footer {
  height: 40px;
  line-height: 40px;
  background: #fff;
  padding: 5px 15px;
  color: #444;
  border-top: 1px solid #d2d6de;
  margin-left: 200px;
}
.footer-version {
  float: right;
}
.info-url {
  color: #409eff;
  text-decoration: none;
}
</style>
