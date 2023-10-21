export type ColumnStringOptions = {
  include?: {
    lowercase?: boolean;
    numbers?: boolean;
    special?: boolean;
    uppercase?: boolean;
    whitespace?: boolean;
  };
  maxLength: number;
  minLength?: number;
};
