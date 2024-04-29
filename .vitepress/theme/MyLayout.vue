<template>
  <Layout>
    <template #doc-after>
      <!-- 123 -->
      <Comment v-if="(theme.commentConfig?.showComment ?? true) && (frontmatter?.showComment ?? true)" :commentConfig="theme.commentConfig" :key="md5(page.relativePath)" />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import md5 from 'blueimp-md5';
  import DefaultTheme from 'vitepress/theme';
  import { useData } from 'vitepress';
  import Comment from './components/layout/Comment.vue';

  const { Layout } = DefaultTheme;
  const { page, theme, frontmatter } = useData();
  const hasSidebar = computed(() => {
    return (
      frontmatter.value.aside !== false && frontmatter.value.layout !== 'home'
    )
  });
</script>

<style scoped></style>