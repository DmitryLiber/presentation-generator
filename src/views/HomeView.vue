<script setup>
import { usePdfStore } from '../stores/pdfStore'
import CardDefault from '../components/CardDefault.vue'
import UploadBox from '../components/UploadBox.vue'
import TableDefault from '../components/TableDefault.vue'
import TableBeautiful from '../components/TableBeautiful.vue'
import ButtonsControl from '../components/ui/ButtonsControl.vue'

const pdfStore = usePdfStore()

const server = document.querySelector('meta[name="server"]').content

if (pdfStore.images.length === 0) pdfStore.loadImages()
</script>

<script>
import { VueDraggableNext } from 'vue-draggable-next'

export default {
  components: {
    draggable: VueDraggableNext
  },
  data: () => {
    return {
      activeTab: 1
    }
  }
}
</script>

<template>
  <main>
    <section class="container section btn-tabs">
      <ButtonsControl>
        <button class="btn" @click="activeTab = 1" :class="`${activeTab === 1 ? 'active' : ''}`">
          Картинки
        </button>
        <button class="btn" @click="activeTab = 2" :class="`${activeTab === 2 ? 'active' : ''}`">
          Таблица
        </button>

        <RouterLink
          to="/generate"
          v-if="pdfStore.selectedImages.length > 0"
          class="btn btn--alt btn-generate"
          >Скачать PDF</RouterLink
        >
      </ButtonsControl>
    </section>

    <section :style="`display: ${activeTab === 1 ? 'block' : 'none'}`">
      <section class="container section">
        <UploadBox :updateImages="pdfStore.updateImages" />
      </section>
      <draggable
        v-model="pdfStore.images"
        class="container cards"
        tag="section"
        @update="pdfStore.sortImages()"
      >
        <CardDefault
          v-for="image in pdfStore.images"
          :key="image"
          :server="server"
          :image="image"
          @delete="pdfStore.deleteImage(image)"
          @select="pdfStore.selectImage"
        />
      </draggable>
    </section>
    <section :style="`display: ${activeTab === 2 ? 'block' : 'none'}`">
      <section class="container section">
        <TableDefault />
      </section>

      <TableBeautiful />
    </section>
  </main>
</template>

<style>
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  overflow: hidden;
  height: 200px;
  display: flex;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.btn-generate {
  margin-left: auto;
}
</style>
