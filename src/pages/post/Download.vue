<template>
  <v-btn
    color="primary"
    @click="exportCSVFile(headers, 'bulletinboard_post_list')"
    class="post-list-btn mr-4"
  >
    Download
  </v-btn>
</template>
<script src="../../services/post/download.js"></script>

<style></style>
