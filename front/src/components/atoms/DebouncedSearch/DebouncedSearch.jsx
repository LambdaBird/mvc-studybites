import { useEffect, useState } from 'react';

import { useDebounce } from '@sb-ui/hooks/useDebounce';
import { SearchOutlined } from '@sb-ui/resources/icons';

import { DebouncedSearchDefaultProps, DebouncedSearchPropTypes } from './types';
import * as S from './DebouncedSearch.styled';

const DebouncedSearch = ({ delay, onChange, ...props }) => {
  const [searchInput, setSearchInput] = useState(null);
  const debouncedValue = useDebounce(searchInput, delay);
  useEffect(() => {
    if (debouncedValue !== null) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange]);

  return (
    <S.StyledInput
      {...props}
      onChange={(e) => setSearchInput(e.target.value)}
      prefix={<SearchOutlined />}
    />
  );
};

DebouncedSearch.defaultProps = DebouncedSearchDefaultProps;
DebouncedSearch.propTypes = DebouncedSearchPropTypes;

export default DebouncedSearch;
