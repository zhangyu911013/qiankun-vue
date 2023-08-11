<template>
  <div class="menu">
    <div
      v-for="menuItem in menuItems"
      :key="menuItem.id"
      @click="redirectTo(menuItem.link)">
      {{ menuItem.name }}
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
