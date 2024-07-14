import { getApiFunc } from './types';

interface ApiResult {
  id: number;
  name: string;
  url: string;
  gender: string;
  status: string;
}

export const getApiData: getApiFunc = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.results && data.info) {
      console.log(data.info);
      return {
        results: data.results.map(
          ({ id, name, url, gender, status }: ApiResult) => ({
            id,
            name,
            url,
            gender,
            status,
          }),
        ),
        count: data.info.count,
        next: data.info.next,
        previous: data.info.prev,
        pages: data.info.pages,
      };
    }
    return null;
    // return { error: 'No result' };
  } catch (error) {
    console.error('Fetching data failed:', error);
    // return { error: (error as Error).message };
  }
};
