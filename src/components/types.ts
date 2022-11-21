export enum ITEM_STATUS {
  NOT_ACTIVE = 0,
  ROW = 1,
  COL = 2,
}

// export enum HANDLER_TYPE {
//   ROW = ITEM_STATUS.ROW,
//   COL = ITEM_STATUS.COL,
// }

export interface IItem {
  row: number;
  col: number;
  status: ITEM_STATUS;
}

