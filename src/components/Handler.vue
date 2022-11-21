<script setup lang="ts">
import { ref } from "vue";
import { ITEM_STATUS } from "./types";

export interface IProps {
  index: number;
  type: ITEM_STATUS;
}
const props = withDefaults(
  defineProps<IProps>(),
  // defineProps<{
  //   row: IItem['row']
  //   col: IItem['col']
  //   status: IItem['status']
  // }>(),
  {
    // type: ITEM_STATUS.NOT_ACTIVE,
  }
);

const emits = defineEmits<{
  (e: "itemClick", item: IProps): void;
}>();

const itemClick = () => {
  emits("itemClick", props);
};
</script>

<template>
  <span
    class="handler-item-wrap"
    :class="['item-type-' + props.type]"
    @click="itemClick"
  >
    <svg
      t="1669014829860"
      class="handler-item"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M832 0H192C156.66 0 128 28.66 128 64v448h768V64c0-35.34-28.66-64-64-64zM128 640c0 70.7 57.32 128 128 128h128v128c0 70.7 57.32 128 128 128s128-57.3 128-128v-128h128c70.68 0 128-57.3 128-128v-64H128v64z m384 208c26.5 0 48 21.48 48 48 0 26.5-21.5 48-48 48s-48-21.5-48-48c0-26.52 21.5-48 48-48z"
      ></path>
    </svg>
  </span>
</template>

<style lang="scss" scoped>
// --item-color: #fff;
// width: 5em;
// height: 5em;
// background-color: var(--item-color);
// border: 3px solid #000;
// border-radius: 6px;
// &.active-type-1{
//   --item-color: var(--row-color);
// }
// &.active-type-2{
//   --item-color: var(--col-color);
// }
.handler-item-wrap {
  --item-color: #fff;
  display: block;
  height: 4em;
  width: 4em;
  // background-color: #ff6;
  fill: var(--item-color);
  cursor: pointer;
  &.item-type-1 {
    --item-color: var(--row-color);
  }
  &.item-type-2 {
    --item-color: var(--col-color);
    transform: rotate(-90deg);
  }
}
</style>
