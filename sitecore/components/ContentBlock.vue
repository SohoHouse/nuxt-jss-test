<template>
  <div>
    <p>ContentBlock Component</p>
    <sc-text :field="fields.heading" />
    <sc-rich-text class="contentDescription" :field="fields.content" />
  </div>
</template>

<script>
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'ContentBlock',
  components: {
    ScText: Text,
    ScRichText: RichText,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
