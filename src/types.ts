export interface SearchResultsObj {
  id: number;
  name: string;
  url: string;
  gender: string;
  status: string;
}

export interface ApiResponse<T> {
  results: T;
  count: number;
  next: string | null;
  previous: string | null;
  pages: number;
}

export type getApiFunc = (
  url: string,
) => Promise<ApiResponse<SearchResultsObj[]> | null | undefined>;

export interface ResultListProps {
  searchResults: SearchResultsObj[];
  loading: boolean;
  error: boolean;
  onItemClick: (id: number) => void;
}

export interface SearchBarProps {
  onSearchSubmit: (value: string) => void;
  initialValue: string;
}

export interface CharactaeDetailData {
  id: number;
  name: string;
  status: string;

  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<string>;
}

export interface PagesNavigationProps {
  prevPage: string | null;
  nextPage: string | null;
  currentPage: number;
  fetchData: (url: string) => void;
}
