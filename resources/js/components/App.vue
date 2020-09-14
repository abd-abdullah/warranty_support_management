<template>
  <div class="wrapper">
    <!-- sidebar -->
    <sidebar></sidebar>
    <div class="main-panel">
      <!-- Navbar -->
      <navbar></navbar>
      <!-- End Navbar -->
      <router-view></router-view>

      <!-- footer -->
      <footerComponent></footerComponent>
    </div>
  </div>
</template>

<script>
import navbar from "./layouts/main/Nav";
import sidebar from "./layouts/main/Sidebar";
import footerComponent from "./layouts/main/Footer";
export default {
  components: { navbar, sidebar, footerComponent },
};
</script>
