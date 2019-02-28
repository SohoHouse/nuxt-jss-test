<template>
    <article>
        <div class="image-container">
            <sc-image class="image" :media="fields.mainImage"/>
        </div>
        <div class="details">
            <div class="details-container">
                <ScText tag="h1" class="title" :field="fields.title"/>
                <ScText class="desc" :field="fields.shortDescription"/>
            </div>
        </div>
        <ScText class="author" :field="fields.author"/>
    </article>
</template>

<script>
  import { Image, Text } from '@sitecore-jss/sitecore-jss-vue'

  export default {
    metaInfo () {
      return {
        bodyAttrs: {
          class: 'note'
        }
      }
    },
    props: {
      fields: {
        type: Object
      }
    },
    components: {
      ScImage: Image,
      ScText: Text
    }
  }
</script>
<style lang="scss" scoped>
    @import '../../client/assets/mixins/mixins';

    article {
        @include f-color-normal;
        display: flex;
        text-decoration: none;
        flex-direction: column;
        position: relative;
        @include transition-fast;
        will-change: auto;
        margin-bottom: $d-med-large;


    }

    .image-container {
        width: 100%;
        position: relative;
        max-height: 800px;
        overflow: hidden;
        @include transition-fast;
        @include ratio(4, 3);
        @include breakpoint(medium) {
            @include ratio(16, 9);
        }

        .image,
        .sc-image-wrapper {
            position: absolute;
            top: 0;
            width: 100%;
        }

        .sc-image-wrapper img {
            width: 100%;
        }
    }

    .details {
        margin: 0 $d-med;
        margin-top: -$d-large;
        max-width: $bp-med;
        background: $white;
        @include shadow(flyingPink);
        position: relative;
        @include breakpoint(medium) {
            width: 80%;
            margin: auto;
            margin-top: -$d-xx-large;
        }
    }

    .details-container {
        padding: $d-med;
        text-align: center;
        margin: auto;
        @include breakpoint(medium) {
            padding: $d-x-large $d-large;
            width: 80%;
        }

        .location {
            margin-bottom: $d-med-small;
        }

        .title {
            @include title-lrg;
            @include f-color-dark;
            font-weight: $f-weight-semi-bold;
        }

        .desc {
            @include f-size-xx-sml;
            margin-top: $d-small;
            margin-bottom: $d-med-small;
        }

        .date {
            @include label-xx-sml;
            border-top: $line-medium;
            display: block;
            padding-top: $d-med-small;
        }
    }

    .author {
        @include title-sml;
        @include f-color-dark;
        text-align: center;
        padding: $d-med 0 $d-med-small;
        border-bottom: $line-medium;
        font-style: italic;
        margin: 0 $d-med;
        @include breakpoint(medium) {
            width: 80%;
            margin: auto;
            max-width: $bp-med;
        }
    }
</style>
