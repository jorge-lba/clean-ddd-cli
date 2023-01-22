import { describe } from 'vitest';
import { commandAggregateDescribe } from './aggregate.test';
import { commandInitDescribe } from './init.test';

describe('Commands:', () => {
  commandInitDescribe();
  commandAggregateDescribe();
});
