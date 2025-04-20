import { useCallback, useEffect, useState } from 'react';
import { Select } from './Select/Select';
import { TextInput } from './TextInput';
import styled from 'styled-components';
import { BaseButton } from '../common/BaseButton';
import { useData } from '../providers/DataProvider';
import { defaultValues } from './filterDefaults';

export function Filters() {
  const [filters, setFilters] = useState(defaultValues);

  const handleChange = (field) => (value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  /* Filter Handlers */
  const { API_URL, setApiURL, setActivePage } = useData();
  const onReset = useCallback(() => {
    setFilters(defaultValues);
    // Clear URL query
    const newURL = `${window.location.pathname}`;
    window.history.pushState({}, '', newURL);
    setActivePage(0);
    setApiURL(`${API_URL}`);
  }, [setApiURL, API_URL, setActivePage]);

  const onApply = useCallback(() => {
    let params = new URLSearchParams();
    // Use only not empty filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    // Update URL sync to filters query
    params = params.toString();
    const newURL = `${window.location.pathname}?${params}`;
    window.history.pushState({}, '', newURL);
    setActivePage(0);
    setApiURL(`${API_URL}${params}`);
  }, [API_URL, setApiURL, filters, setActivePage]);

  /* Apply query from URL */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filtersFromURL = {
      status: params.get('status') || '',
      gender: params.get('gender') || '',
      species: params.get('species') || '',
      name: params.get('name') || '',
      type: params.get('type') || ''
    };
    setFilters(filtersFromURL);
    setActivePage(0);
    setApiURL(`${API_URL}${params.toString()}`);
  }, [setApiURL, setActivePage, API_URL]);

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
