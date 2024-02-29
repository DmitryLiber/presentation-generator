<script>
import { API } from '../utils'

export default {
  name: 'UploadBox',
  data() {
    return {
      dragOver: false,
      download: false
    }
  },
  props: {
    updateImages: {
      type: Function
    }
  },
  methods: {
    handleClick() {
      if (this.itemDisabled) return
      this.$refs.input.click()
    },

    handleChange(e) {
      const files = this.$refs.input

      if (!files) return

      this.uploadFiles(e.target)
      this.$refs.input.value = null
    },

    onDrop(e) {
      if (this.itemDisabled) return
      this.dragOver = false
      this.$refs.input.files = e.dataTransfer.files
      this.uploadFiles()
    },

    async uploadFiles() {
      const input = this.$refs.input
      if (input.files.length === 0) return

      const fd = new FormData(input.closest('form'))
      this.download = true

      const result = await API.post(fd, { upload: true })

      if (result) {
        this.download = false
        if (result.msg) {
          this.updateImages(JSON.parse(result.msg))
        }
      }
    }
  }
}
</script>

<template>
  <form enctype="multipart/form-data" class="upload">
    <div
      :class="`upload__box${dragOver ? ' hover' : ''}`"
      @click="handleClick"
      @drop.prevent="onDrop"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
    >
      <input
        :disabled="download"
        id="files"
        class="upload__input"
        ref="input"
        name="images[]"
        type="file"
        @change="handleChange"
        multiple="multiple"
        accept="image/jpg, image/jpeg, image/webp"
      />

      <span v-if="!download" class="upload__label">
        Выберите или перетащите изображения в область
      </span>
      <span v-else class="upload__label"> Загрузка... </span>
    </div>
  </form>
</template>

<style lang="scss">
.upload {
  &__box {
    --color-border: #ccc;

    height: 200px;
    width: 100%;
    background-color: #f1f1f1;
    border-radius: 10px;
    border: 2px dotted var(--color-border);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 20px;
    transition: border-color 0.2s;

    &.hover {
      --color-border: rgb(45, 146, 45);
    }
  }
  &__input {
    display: none;
  }
  &__label {
    color: #222;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
