<script setup>
import { useTableStore } from '@/stores/tableStore'
const tableStore = useTableStore()

const tableFinish = () => {
  const currentTable = tableStore.getTable()

  let [One, Two, Three] = [0, 0, 0]

  const resultRow = []

  currentTable.forEach((tr, indexTr) => {
    if (tr.type === 'row') {
      const [_, tdTwo, tdThree, tdFour] = tr.data

      One += Number(tdTwo) || 0
      Two += Number(tdThree) || 0
      Three += Number(tdFour) || 0
    }

    if (currentTable[indexTr + 1]?.type === 'title' || indexTr === currentTable.length - 1) {
      resultRow.push({ index: indexTr, data: ['Итог', One, Two, Three] })
    }

    if (tr.type === 'title') {
      ;[One, Two, Three] = [0, 0, 0]
    }
  })

  const mainResult = [0, 0, 0]

  let offset = 1
  resultRow.forEach(({ index, data }) => {
    const [_, one, two, three] = data

    currentTable.splice(index + offset, 0, { type: 'result', data })
    offset++

    mainResult[0] += Number(one) || 0
    mainResult[1] += Number(two) || 0
    mainResult[2] += Number(three) || 0
  })

  currentTable.push({
    type: 'mainResult',
    data: ['Итог за разработку сайта', mainResult[0], mainResult[1], mainResult[2]]
  })

  return currentTable
}

const detectClass = (tr) => {
  if (tr.type === 'title') {
    return 'table-beautiful__title'
  }

  if (tr.type === 'result') {
    return 'table-beautiful__result'
  }

  if (tr.type === 'mainResult') {
    return 'table-beautiful__mainResult'
  }

  if (tr.type === 'row') {
    return 'table-beautiful__row'
  }
}
</script>

<template>
  <div class="table-beautiful">
    <table class="table-beautiful__table" v-if="tableStore.table.length > 0">
      <tr class="table-beautiful__title">
        <th>Наименование</th>
        <th>Стоимость<br />(рублей)</th>
        <th>Сроки<br />(трудовые часы)</th>
        <th>Сроки выполнения<br />(рабочие дни)</th>
      </tr>
      <tr v-for="(tr, indexTr) in tableFinish()" :key="indexTr" :class="`${detectClass(tr)}`">
        <td
          v-for="(td, indexTd) in tr.data"
          :key="indexTd"
          :colspan="`${tr.type === 'title' ? 4 : ''}`"
        >
          {{ tr.data[indexTd] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss">
.table-beautiful {
  color: #fff;
  background-image: url('../assets/images/table-bg.jpg');
  min-height: 1200px;
  position: relative;
  padding: 0 86px 0 150px;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    background-repeat: no-repeat;
  }

  &::before {
    background-image: url('../assets/images/table-left.png');
    left: 23px;
    width: 98px;
    height: 1166px;
  }

  &::after {
    background-image: url('../assets/images/table-right.png');
    right: -11px;
    width: 73px;
    height: 1092px;
  }

  th {
    text-align: center;
  }

  th,
  td {
    padding: 15px 35px 35px 35px;

    &:not(:first-child) {
      width: 270px;
    }
  }

  input {
    width: 100%;
  }

  &__table {
    width: 100%;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.1;
    border: 1px solid #7e7e7e;
    border-collapse: collapse;
  }

  &__title {
    font-size: 23px;
    font-weight: 700;
    border: 1px solid #7e7e7e;
  }

  &__row {
    td {
      font-weight: 300;

      &:first-child {
        padding-left: 72px;
      }

      &:not(:first-child) {
        text-align: center;
        border-left: 1px solid #7e7e7e;
        border-right: 1px solid #7e7e7e;
      }
    }
  }

  &__result {
    font-weight: 700;

    td {
      &:first-child {
        padding-left: 72px;
      }

      &:not(:first-child) {
        border-left: 1px solid #7e7e7e;
        border-right: 1px solid #7e7e7e;
      }

      &:not(:first-child) {
        text-align: center;
      }
    }
  }

  &__mainResult {
    font-size: 23px;
    font-weight: 700;
    border: 1px solid #7e7e7e;

    td {
      &:not(:first-child) {
        text-align: center;
      }
    }
  }
}
</style>
