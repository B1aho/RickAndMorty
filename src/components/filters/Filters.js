import { useEffect, useState } from 'react';
import { Select } from './Select';
import { TextInput } from './TextInput';
import styled from 'styled-components';
import { BaseButton } from '../common/BaseButton';

export function Filters() {
  const [filters, setFilters] = useState({});
  //const {API_URL, setApiURL} = useData();

  return (
    <FiltersContainer>
      <Select placeholder="Status" options={['Alive', 'Dead', 'Unknown']} />
      <Select
        placeholder="Gender"
        options={['Female', 'Male', 'Genderless', 'Unknown']}
      />
      <TextInput placeholder="Species" />
      <TextInput placeholder="Name" />
      <TextInput placeholder="Type" />
      <FilterControls>
        <Apply>Apply</Apply>
        <Reset>Reset</Reset>
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
