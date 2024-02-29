import { defineStore } from 'pinia'
import { ref } from 'vue'
import { API } from '../utils'

const iconTablet = { image: 'icon-table.jpg', number: -1 }

export const usePdfStore = defineStore('pdfStore', () => {
  const images = ref([])
  const selectedImages = ref([])
  const table = ref([])

  function selectImage({ image }) {
    if (this.selectedImages.includes(image)) {
      this.selectedImages = this.selectedImages.filter((item) => item !== image)
    } else {
      this.selectedImages.push(image)
    }

    this.images = this.images.map((target) => {
      if (this.selectedImages.indexOf(target.image) > -1) {
        return {
          ...target,
          number: this.selectedImages.indexOf(target.image) + 1
        }
      }
      return {
        ...target,
        number: -1
      }
    })
  }

  function sortImages() {
    const images = this.images
      .map(({ image }) => {
        if (image === 'icon-table.jpg') return
        return image
      })
      .filter((image) => image !== undefined)

    API.get(`&sortImages=${JSON.stringify(images)}`)
  }

  async function deleteImage({ image }) {
    const response = await API.get(`&imageDelete=${image}`)

    if (response) {
      if (response.status === 201) {
        this.selectedImages = this.selectedImages.filter((item) => item !== image)

        this.images = this.images.filter((item) => item.image !== image)
      }
    }
  }

  async function loadImages() {
    const response = await API.get('&images=all')

    if (response) {
      const images = Object.values(JSON.parse(response.msg))

      this.images = [
        iconTablet,
        ...images.map((image) => {
          return {
            image,
            number: -1
          }
        })
      ]
    }
  }

  function updateImages(images) {
    const newImages = images.map((image) => {
      return {
        image,
        number: -1
      }
    })

    this.images.shift()

    this.images = [iconTablet, ...newImages, ...this.images]

    sortImages()
  }

  return {
    images,
    selectedImages,
    sortImages,
    table,
    selectImage,
    deleteImage,
    loadImages,
    updateImages
  }
})
