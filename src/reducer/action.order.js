export const DATATYPE = {
  dataName: 'data',
}

export function dataFetch(state) {
  return {
    type: DATATYPE.dataName,
    state: state
  }
}