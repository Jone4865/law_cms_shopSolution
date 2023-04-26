type IsPaginationBaseParams = {
  take: number;
  skip: number;
};

type IsSearchTextBaseParams = {
  searchWord?: string;
} & IsPaginationBaseParams;

type KindType = {
  id: number;
  name: string;
};
