<script setup>
import { useTableStore } from '@/stores/tableStore'
import ButtonsControl from '@/components/ui/ButtonsControl.vue'
const tableStore = useTableStore()
</script>

<script>
import { defineComponent } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
export default defineComponent({
  components: {
    draggable: VueDraggableNext
  }
})
</script>

<template>
  <table class="section table">
    <thead>
      <tr>
        <th>Наименование</th>
        <th>Стоимость<br />(рублей)</th>
        <th>Сроки<br />(трудовые часы)</th>
        <th>Сроки выполнения<br />(рабочие дни)</th>
        <th></th>
      </tr>
    </thead>
    <draggable v-model="tableStore.table" tag="tbody" handle=".handle">
      <tr v-for="(tr, indexTr) in tableStore.table" :key="indexTr">
        <td
          v-for="(td, indexTd) in tr.data"
          :key="indexTd"
          :colspan="`${tr.type === 'title' ? 4 : '1'}`"
        >
          <input
            type="text"
            v-model="tr.data[indexTd]"
            :placeholder="`${tr.type === 'title' ? 'Титул блока' : ''}`"
          />
        </td>
        <td class="table__controls">
          <span class="handle"></span>
          <button class="btn btn--xs" @click="tableStore.removeRow(indexTr)">X</button>
        </td>
      </tr>
    </draggable>
  </table>

  <ButtonsControl>
    <button class="btn" @click="tableStore.addRow()">+ Строка</button>
    <button class="btn" @click="tableStore.addRowBlock()">+ Блок</button>
  </ButtonsControl>
</template>

<style lang="scss">
.table {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;

  &__title {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 15px;
  }

  tr {
    background-color: #fff;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  th,
  td {
    width: 25%;

    &:last-child {
      width: 78px;
    }
  }

  th {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 500;
    line-height: 1;
  }

  td {
    &:not(:last-child) {
      margin-right: 8px;
    }

    input {
      border: 1px solid #ccc;
      padding: 8px 12px;
      border-radius: 5px;
      outline: none;

      &:focus {
        border: 1px solid #222;
      }
    }

    &[colspan='4'] {
      width: 100%;
    }
  }

  input {
    width: 100%;
  }

  &__controls {
    display: flex;
    align-items: center;
  }

  .handle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    margin-left: 5px;
    margin-right: 15px;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      background-image: url('../assets/images/i-sort-vertical.svg');
      width: 100%;
      height: 100%;
    }
  }
}
</style>
