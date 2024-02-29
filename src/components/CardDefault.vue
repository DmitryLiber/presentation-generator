<script setup>
import { usePdfStore } from '../stores/pdfStore'
const pdfStore = usePdfStore()
</script>

<script>
const server = document.querySelector('meta[name="server"]').content
export default {
  props: {
    image: Object
  }
}
</script>

<template>
  <article class="card">
    <button
      type="button"
      title="Удалить картинку"
      class="btn btn--xs card__del"
      @click="pdfStore.deleteImage(image)"
      v-if="image.image !== 'icon-table.jpg'"
    >
      X
    </button>

    <span v-if="image.number > 0" class="card__number">{{ image.number }}</span>

    <button type="button" title="Выбрать картинку" @click="pdfStore.selectImage(image)">
      <img :src="`${server}/images/${image.image}`" />
    </button>
  </article>
</template>

<style lang="scss">
.card {
  position: relative;
  border-radius: 5px;
  border: 2px solid #f1f1f1;

  &__del {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  &__number {
    position: absolute;
    top: 8px;
    left: 8px;
    border-radius: 10px;
    background-color: #fff;
    font-size: 20px;
    line-height: 1;
    padding: 4px 10px 6px;
    border: 2px solid #0b66bb;
    font-weight: 600;
  }
}
</style>
