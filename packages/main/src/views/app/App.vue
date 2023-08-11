<template>
  <div id="app">
    <div class="app-header"><HeaderComponent /></div>
    <div class="app-main">
      <div class="app-aside">
        <MenuComponent />
      </div>
      <div class="app-content" id="app-content"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script src="./index.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
