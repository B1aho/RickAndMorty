import axios from 'axios';
import { useCallback } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/?';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  // Добавляем состояние фильтров и возвращаем setFilters в компонент фильтров, который сможет настраивать их
  // filters объект с конфигурацией фильтров - дефолтными значениями null/undefined
  // Здесь хук который применяет params к url или применять прямо перед fetchData();

  /**
   * const params = new URLSearchParams().toString();
    setApiURL(`${API_URL}${params}`);
   */
  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);
    setNotFound(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        if (e.response?.status === 404) {
          setCharacters([]);
          setInfo({});
          setNotFound(true);
        } else {
          setIsError(true);
          console.error(e);
        }
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      notFound,
      API_URL
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      notFound,
      fetchData
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
