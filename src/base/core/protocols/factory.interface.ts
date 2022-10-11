export interface IFactory<Return, Props> {
  execute(props?: Props): Return;
}