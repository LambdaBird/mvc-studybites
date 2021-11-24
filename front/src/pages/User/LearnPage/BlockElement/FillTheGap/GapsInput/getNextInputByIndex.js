export const getNextInputByIndex = (inputs, index, prev) => {
  const filtered = inputs.filter(Boolean);
  const currentIndex = filtered.findIndex((x) => x === inputs[index]);
  return prev ? filtered[currentIndex - 1] : filtered[currentIndex + 1];
};
