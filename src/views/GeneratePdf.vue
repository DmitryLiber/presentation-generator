<script setup>
import { usePdfStore, URL_SERVER } from '@/stores/pdfStore'

const pdfStore = usePdfStore()
</script>

<script>
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import TableBeautiful from '../components/TableBeautiful.vue'

export default {
  async mounted() {
    const sections = this.$refs.generateDocument.querySelectorAll('section')
    const pdf = new jsPDF({ orientation: 'l', unit: 'px' })

    const loadTable = new Promise((resolve) => {
      if (!this.$refs.generateDocument.querySelector('.table-beautiful')) {
        resolve(true)
        return
      }

      const table = this.$refs.generateDocument.querySelector('.table-beautiful')

      html2canvas(table, {
        allowTaint: true,
        backgroundColor: null
      }).then((canvas) => {
        table.innerHTML = ''
        table.appendChild(canvas)

        setTimeout(() => {
          table.querySelector('canvas').style.width = `${sections[0].clientWidth}px`
          table.classList.remove('table-beautiful')
          resolve(canvas)
        })
      })
    })

    const loadImages = () => {
      const images = [...document.querySelectorAll('img')].map((image) => {
        return new Promise((resolve) => image.addEventListener('load', () => resolve(true)))
      })

      return images
    }

    Promise.all([loadTable, ...loadImages()]).then(() => generatePdf())

    const generatePdf = () => {
      sections.forEach((section) => {
        pdf.addPage([section.clientWidth, section.clientHeight])

        if (section.querySelector('canvas')) {
          pdf.addImage(
            section.querySelector('canvas').toDataURL('image/webp', 1),
            'webp',
            0,
            0,
            section.clientWidth,
            section.clientHeight
          )
          return
        }
        const img = section.querySelector('img')
        pdf.addImage(img.src, 'jpg', 0, 0, section.clientWidth, section.clientHeight)
      })

      pdf.deletePage(1)
      setTimeout(() => pdf.save('presentation.pdf'), 100)
      setTimeout(() => window.history.go(-1), 200)
    }
  }
}
</script>

<template>
  <main class="generateDocument" ref="generateDocument">
    <section v-for="image in pdfStore.selectedImages" :key="image">
      <TableBeautiful v-if="image === 'icon-table.jpg'" />
      <img v-else :src="`${URL_SERVER}/api/getImage.php?image=${image}`" />
    </section>
  </main>
</template>

<style>
.generateDocument {
  width: 1920px;
}

img {
  width: 100%;
  height: auto;
  display: block;
}

main > *:not(:last-child) {
  margin-bottom: 0px;
}
</style>
