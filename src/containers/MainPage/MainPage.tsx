import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { SearchResultsObj } from '../../types';
import { BASE_URL } from '../../constants';
import { getApiData } from '../../getApiData';
import SearchBar from '../../components/SearchBar/SearchBar';
import ResultList from '../../components/ResultList/ResultList';
import useSearchQuery from '../../hooks/SearchQueryHook';
import PagesNavigation from '../../components/PagesNavigation/PagesNavigation';
import styles from './MainPage.module.css';

const MainPage = () => {
  const [searchValue, setSearchValue, saveToLocalStorage] =
    useSearchQuery('searchValue');
  const [searchResults, setSearchResults] = useState<SearchResultsObj[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [isOpenonMainPage, setIsOpenonMainPage] = useState<number | null>(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get('page');
  const navigate = useNavigate();

  useEffect(() => {
    const page = queryParam ? parseInt(queryParam, 10) : 1;
    setCurrentPage(page);

    if (searchValue) {
      fetchData(`${BASE_URL}?name=${searchValue}&page=${page}`);
    } else {
      fetchData(`${BASE_URL}?page=${page}`);
    }
  }, []);

  const fetchData = async (url: string) => {
    const getPageValue = (url: string): string | null => {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get('page');
    };

    const pageValue = getPageValue(url);
    let pageNumber: number | null = null;

    if (pageValue !== null) {
      const parsedNumber = parseInt(pageValue, 10);
      if (!isNaN(parsedNumber)) {
        pageNumber = parsedNumber;
        setCurrentPage(pageNumber);
      }
    }
    setError(false);
    setIsLoading(true);

    const dataList = await getApiData(url);
    if (dataList) {
      setSearchResults(dataList.results);
      setNextPage(dataList.next);
      setPrevPage(dataList.previous);
      setPagesCount(dataList.pages);
    } else {
      setError(true);
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  const handleSearchSubmit = (value: string) => {
    setSearchValue(value);
    saveToLocalStorage();
    fetchData(`${BASE_URL}?name=${value}`);
    searchParams.set('search', value.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleOpenDetailedPage = (id: number) => {
    setIsOpenonMainPage(id);
    searchParams.set('details', id.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleCloseDetailsBlock = () => {
    if (isOpenonMainPage !== null) {
      setIsOpenonMainPage(null);
    }
  };

  const contextValue = { isOpenonMainPage, setIsOpenonMainPage };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.interface}>
          <SearchBar
            onSearchSubmit={handleSearchSubmit}
            initialValue={searchValue}
          />
          <PagesNavigation
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={currentPage}
            pagesCount={pagesCount}
            fetchData={fetchData}
          />
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading data</p>}
        <div className={styles.result_block} onClick={handleCloseDetailsBlock}>
          <ResultList
            searchResults={searchResults}
            loading={isLoading}
            error={error}
            onItemClick={handleOpenDetailedPage}
          />
          <Outlet context={contextValue} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
