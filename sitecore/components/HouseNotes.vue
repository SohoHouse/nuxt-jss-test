<template>
  <div :is="element" class="house-notes-logo">
    <img src="../../data/media/img/icons/house-notes.svg"/>
    <span>House Notes</span>
  </div>
</template>

<script>
  import { Image } from '@sitecore-jss/sitecore-jss-vue';
  export default {
    props: {
      fields: Object,
      element: {
        type: String,
        default: 'h2',
        required: false
      }
    },
    components: {
      ScImage: Image
    },
  }
</script>

<style lang="scss">

  @import '../../client/assets/mixins/mixins';

  .house-notes-logo {
    min-width: 80px;
    @include ratio(346, 32);
    position: relative;

    div {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    svg {
      display: block;
      margin: 0 auto;
      max-height: 100%;
      max-width: 100%;
      height: 100%;
      overflow: visible;

      &:not(:root) {
        overflow: visible;
      }
    }
    span {
      @include visually-hidden;
    }
  }

</style>
