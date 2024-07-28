import { ApiResult, getApiFunc } from './types';

export const getApiData: getApiFunc = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.results && data.info) {
      // console.log(data.info);
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
  } catch (error) {
    console.error('Fetching data failed:', error);
  }
};
