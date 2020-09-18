<template>
  <div class="app">
      <vue-progress-bar></vue-progress-bar>
     <component :is="addLayout">
			<router-view />
		</component>
        
  </div>
</template>

<script>
    const defaultLayout = "defaultlayout";
    export default {
        name: "App",
        computed: {
            addLayout() {
                return this.$route.meta.layout || defaultLayout;
            }
        }
    };
</script>