import { Select } from 'antd';
import React from 'react';

interface SelectSearchTypeProps {
  setSelectedSearchOption: (value: string) => void;
}

export const SelectSearchType: React.FC<SelectSearchTypeProps> = ({ setSelectedSearchOption }) => {
  const searchOptions = [
    { label: '제목', value: '제목' },
    { disabled: true, label: '내용', value: '내용' },
    { disabled: true, label: '카테고리', value: '카테고리' },
  ];

  return (
    <Select
      defaultValue="제목"
      onChange={(e) => setSelectedSearchOption(e.valueOf())}
      options={searchOptions}
      style={{ minHeight: 40, minWidth: 100, top: 4, width: 'fit-content' }}
    />
  );
};
