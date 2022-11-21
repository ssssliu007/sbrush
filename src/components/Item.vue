
<script setup lang="ts">
import { ref } from "vue";
import {IItem, ITEM_STATUS} from './types'

interface IProps extends IItem {
  row: IItem['row']
  col: IItem['col']
  status: IItem['status']
}
const props = withDefaults(
  defineProps<IProps>(),
  // defineProps<{
  //   row: IItem['row']
  //   col: IItem['col']
  //   status: IItem['status']
  // }>(),
  {
    status: 0,
  }
);

</script>

<template>
  <span class="item-cell" :class="[
    'active-type-' + props.status
  ]" ></span>
</template>

<style lang="scss" scoped>
.item-cell{
  --item-color: #fff;
  width: 5em;
  height: 5em;
  background-color: var(--item-color);
  border: 3px solid #000;
  border-radius: 6px;
  transition: all .2s;
  &.active-type-1{
    --item-color: var(--row-color);
  }
  &.active-type-2{
    --item-color: var(--col-color);
  }
}


</style>
