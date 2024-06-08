const diff = (file1Data, file2Data) => {
  const keys = Object.keys({ ...file1Data, ...file2Data }).sort();
  const diffLines = keys.map((key) => {
    const value1 = file1Data[key];
    const value2 = file2Data[key];

    if (value1 === value2) {
      return `    ${key}: ${value1}`;
    }
    if (value1 !== undefined && value2 !== undefined) {
      return [`  - ${key}: ${value1}`, `  + ${key}: ${value2}`];
    }
    if (value1 !== undefined) {
      return `  - ${key}: ${value1}`;
    }
    return `  + ${key}: ${value2}`;
  });
  return `{\n${diffLines.flat().join('\n')}\n}`;
};

export default diff;
