<template>
  <AnchorDelegator>
    <p>ContentBlock Component</p>
    <sc-text :field="fields.heading" />
    <sc-rich-text class="contentDescription" :field="fields.content" />
  </AnchorDelegator>
</template>

<script>
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import AnchorDelegator from '@/components/anchor-delegator'

export default {
  name: 'ContentBlock',
  components: {
    AnchorDelegator,
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
