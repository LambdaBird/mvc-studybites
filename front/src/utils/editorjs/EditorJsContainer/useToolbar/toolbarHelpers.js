export const getCurrentBlock = (editor) => {
  const currentIndex = editor.blocks.getCurrentBlockIndex();
  return editor.blocks.getBlockByIndex(currentIndex);
};
