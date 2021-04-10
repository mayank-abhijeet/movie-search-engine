import { getPosters } from './searchServices';

export const getPosterData = (globalContext, searchKey = '', page = 1) => {
  const { setGlobalState, ...globalState } = globalContext;
  setGlobalState({ ...globalState, loading: true });
  getPosters(searchKey, false, page)
    .then((res) => {
      const { Response, Search, totalResults } = res || {};
      const newGlobalState = {
        ...globalState,
        searchKey,
        page,
        totalResults: Number(totalResults),
        loading: false,
        searchResults: Response === 'False' || !Search ? [] : Search,
      };
      setGlobalState(newGlobalState);
    })
    .catch(() => {
      setGlobalState({ ...globalState, loading: false });
    });
};
