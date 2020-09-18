<template>
<div class="off-canvas-sidebar">
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white">
    <div class="container">
      <div class="navbar-wrapper">
        <a class="navbar-brand" href="javascript:;">Login</a>
      </div>
    </div>
  </nav>

  <!-- End Navbar -->
  <div class="wrapper wrapper-full-page">
    <div
      class="page-header login-page header-filter"
      filter-color="black"
      style="background-size: cover; background-position: top center;"
    >
      <!--   you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " -->
  <router-view></router-view>
      <footer class="footer">
        <div class="container">
          <nav class="float-left">
            <ul>
              <li>
                <a target="_blank" href="https://www.citywaterpurifier.com/">City Water Purifier</a>
              </li>
              <li>
                <a target="_blank" href="https://www.citywaterpurifier.com/water-purifier-about-us/">About Us</a>
              </li>
              <li>
                <a target="_blank" href="https://www.citywaterpurifier.com/blog/">Blog</a>
              </li>
            </ul>
          </nav>
          <div class="copyright float-right">
            &copy;2020, made with
            <i class="material-icons">favorite</i> by
            <a href="https://www.facebook.com/abd1rti/" target="_blank">Md. Abdullah</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</div>
</template>

