import { useEffect, useState } from 'react';
import { Select } from './Select';
import { TextInput } from './TextInput';

export function Filters() {
  const [filters, setFilters] = useState({});
  //const {API_URL, setApiURL} = useData();

  return (
    <div>
      <Select placeholder="Status" options={['Alive', 'Dead', 'Unknown']} />
      <Select
        placeholder="Gender"
        options={['Female', 'Male', 'Genderless', 'Unknown']}
      />
      <TextInput placeholder="Species" />
      <TextInput placeholder="Name" />
      <TextInput placeholder="Type" />
      <FilterControls>
        <Apply/>
        <Reset/>
      </FilterControls>
    </div>
  );
}
