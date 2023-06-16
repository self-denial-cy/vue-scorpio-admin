/// <reference types="canvas-datagrid" />

declare module 'canvas-datagrid' {
  // hack
  const init: (args: ConstructorParameters<typeof canvasDatagrid>[0]) => canvasDatagrid;
  export default init;
}
