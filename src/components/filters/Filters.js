import { useCallback, useState } from 'react';
import { Select } from './Select';
import { TextInput } from './TextInput';
import styled from 'styled-components';
import { BaseButton } from '../common/BaseButton';
import { useData } from '../providers/DataProvider';

export function Filters() {
  const [filters, setFilters] = useState(defaultValues);

  const handleChange = (field) => (value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const { API_URL, setApiURL } = useData();

  const onReset = useCallback(() => {
    setFilters(defaultValues);
    setApiURL(`${API_URL}`);
  }, [setApiURL, API_URL]);

  const onApply = useCallback(() => {
    const params = new URLSearchParams(filters).toString();
    setApiURL(`${API_URL}${params}`);
  }, [API_URL, setApiURL, filters]);

  return (
    <FiltersContainer>
      <Select
        value={filters.status}
        onChange={handleChange('status')}
        placeholder="Status"
        options={['Alive', 'Dead', 'Unknown']}
      />
      <Select
        placeholder="Gender"
        value={filters.gender}
        onChange={handleChange('gender')}
        options={['Female', 'Male', 'Genderless', 'Unknown']}
      />
      <TextInput
        placeholder="Species"
        value={filters.species}
        onChange={handleChange('species')}
      />
      <TextInput
        placeholder="Name"
        value={filters.name}
        onChange={handleChange('name')}
      />
      <TextInput
        placeholder="Type"
        value={filters.type}
        onChange={handleChange('type')}
      />
      <FilterControls>
        <Apply onClick={onApply}>Apply</Apply>
        <Reset onClick={onReset}>Reset</Reset>
      </FilterControls>
    </FiltersContainer>
  );
}

const defaultValues = {
  status: '',
  gender: '',
  species: '',
  name: '',
  type: ''
};

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 10px;

  @media (max-width: 529px) {
    grid-template-columns: 1fr;
    grid-template-rows: none;
  }
`;

const FilterControls = styled.div`
  width: 180px;
  height: 40px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const Apply = BaseButton('#83BF46');

const Reset = BaseButton('#FF5152');
