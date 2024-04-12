import { Select } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useState } from 'react';

const SearchScreen: React.FC = () => {
  const [selectedSearchOption, setSelectedSearchOption] = useState<string>('제목');

  const onSearch = (e) => {
    console.log(e, selectedSearchOption);
  };

  const searchOptions = [
    { value: '제목', label: '제목' },
    { value: '내용', label: '내용' },
    { value: '카테고리', label: '카테고리' },
  ];

  return (
    <div>
      <Search
        addonBefore={
          <Select
            defaultValue="제목"
            options={searchOptions}
            onChange={(e) => setSelectedSearchOption(e.value)}
            style={{ display: 'flex', width: 'fit-content' }}
          />
        }
        style={{ minWidth: 300, maxWidth: 600 }}
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
};

export default SearchScreen;
