interface IQueryCacheOptions {
  cacheTime: number;
  staleTime: number;
  refetchOnWindowFocus: boolean;
}

export const queryCacheOptions: IQueryCacheOptions = {
  cacheTime: 1000 * 60 * 5,
  staleTime: 1000 * 60,
  refetchOnWindowFocus: false,
}