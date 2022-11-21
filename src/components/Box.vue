<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Item from "./Item.vue";
import Handler, { IProps as IHandlerItem } from "./Handler.vue";
import { IItem, ITEM_STATUS } from "./types";
import data1 from '../assets/data/data-1.json'

const props = withDefaults(
  defineProps<{
    size: number;
  }>(),
  {
    size: 3,
  }
);

function getList(size = props.size, dataStr?:string){
  const re: IItem[] = [];
  let data:number[] | undefined;
  if(dataStr){
    dataStr = dataStr.replace(/\s/g, '')
    const newSize = Math.pow(dataStr.length || 0, .5)
    if(newSize === newSize>>>0){
      size = newSize;
      data = dataStr.split('').map(Number)
    }
  }
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const status = data && data[c + r * size] || ITEM_STATUS.NOT_ACTIVE
      re.push({
        row: r,
        col: c,
        status,
      });
    }
  }
  return ref(re);
}

const list = getList();

const targetList = getList(undefined, data1.data)


const containerVarCpt = computed(() => {
  return {
    "--box-size": props.size,
  };
});

const handlerClick = (handlerItem: IHandlerItem) => {
  let key:keyof IItem = handlerItem.type === ITEM_STATUS.COL? 'row' : 'col' ;
  list.value.forEach(i=>{

    if(i[key] === handlerItem.index){
      i.status = handlerItem.type
    }

  })
};
</script>

<template>
  <h1>涂成上图颜色</h1>
  <div class="target-wrap container-wrap" :style="containerVarCpt">
    <Item v-for="i of targetList" :key="`${i.row}-${i.col}`" v-bind="i"></Item>
  </div>
  <div class="container-wrap" :style="containerVarCpt">
    <Item v-for="i of list" :key="`${i.row}-${i.col}`" v-bind="i"></Item>
    <div class="handler-wrap is-row">
      <Handler
        v-for="i of size"
        :key="i"
        :type="ITEM_STATUS.ROW"
        :index="i - 1"
        @item-click="handlerClick"
      />
    </div>
    <div class="handler-wrap is-col">
      <Handler
        v-for="i in size"
        :key="i"
        :type="ITEM_STATUS.COL"
        :index="i - 1"
        @item-click="handlerClick"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-wrap {
  --gap-size: 3px;
  display: grid;
  grid-template-rows: repeat(var(--box-size), 1fr);
  grid-template-columns: repeat(var(--box-size), 1fr);
  grid-row-gap: var(--gap-size);
  grid-column-gap: var(--gap-size);
  position: relative;
}
.target-wrap{
  font-size: 1.2vw;
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
}
.handler-wrap {
  position: absolute;
  display: grid;
  right: 0;
  bottom: 0;
  grid-row-gap: var(--gap-size);
  grid-column-gap: var(--gap-size);
  place-items: center center;
  &.is-col {
    height: 100%;
    top: 0;
    grid-template-rows: repeat(var(--box-size), 1fr);
    transform: translateX(120%);
  }
  &.is-row {
    width: 100%;
    left: 0;
    grid-template-columns: repeat(var(--box-size), 1fr);
    transform: translateY(120%);
  }
}
</style>
