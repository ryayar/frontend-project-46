export const filesJson = {
  file1: 'json/file1.json',
  file2: 'json/file2.json',
  file3: 'json/file3.json',
  file4: 'json/file4.json',
};

export const filesYaml = {
  file1: 'yaml/file1.yaml',
  file2: 'yaml/file2.yaml',
};

export const filesYml = {
  file1: 'yml/file1.yml',
  file2: 'yml/file2.yml',
};

export const stylishUnknownNodeValue = [
  {
    type: 'unknown',
    name: 'test',
    value: 'value',
  },
];

export const parseFileUnsupportedFormat = {
  data: '',
  ext: '.txt',
};

export const getFormatData = {
  diff: [],
  format: 'tralala',
};

export const genDiffFormatJson = {
  diff: [
    {
      key: 'common',
      type: 'nested',
      children: [
        { key: 'follow', type: 'added', value: false },
        { key: 'setting1', type: 'unchanged', value: 'Value 1' },
      ],
    },
  ],
  format: 'json',
};
