import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTableStore = defineStore('pdfTable', () => {
  const table = ref([])

  function addRowBlock() {
    this.table.push({ type: 'title', data: [''] })
    this.table.push({ type: 'row', data: Array(4).fill('') })
  }

  function addRow() {
    this.table.push({ type: 'row', data: Array(4).fill('') })
  }

  function removeRow(removeIndex) {
    this.table = this.table.filter((_, index) => index !== removeIndex)
  }

  function sort(value) {
    this.table.commit('updateList', value)
  }

  function getTable() {
    return [...this.table]
  }

  function $reset() {
    this.table = []
  }

  return {
    table,
    addRowBlock,
    addRow,
    removeRow,
    sort,
    getTable,
    $reset
  }
})
