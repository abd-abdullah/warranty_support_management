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
import navbar from "./Nav";
import sidebar from "./Sidebar";
import footerComponent from "./Footer";
export default {
  components: { navbar, sidebar, footerComponent },
}
</script>
