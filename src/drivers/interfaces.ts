export interface ITableQueryBuilder {
  getDeleteQuery(): string;
  getInsertQuery(): string;
}
