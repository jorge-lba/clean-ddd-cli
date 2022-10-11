export type AsyncSubscribeReturn<Result> = {
  subscribeName: string;
  result?: Result;
  error?: Error;
};
