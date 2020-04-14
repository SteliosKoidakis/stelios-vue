import {
  checkSearchResultByType,
  sortString,
  getObjectByDirection,
} from '.';

let item;
let text;
let searchableFields;

describe('Give utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('given checkSearchResultByType function', () => {
    describe('when undefined params pass', () => {
      it('should not break', () => {
        checkSearchResultByType(undefined, undefined, undefined);
      });
      it('should return a falsy value', () => {
        const result = checkSearchResultByType(undefined, undefined, undefined);
        expect(result).toBeFalsy();
      });
    });
    describe('when the text exist on the specific searchable field ', () => {
      it('should return true', () => {
        item = {
          title: 'My title',
        };
        text = 'My';
        searchableFields = ['title'];
        const result = checkSearchResultByType(item, text, searchableFields);
        expect(result).toBe(true);
      });
    });
  });
  describe('given sortString function', () => {
    describe('when current and next string pass', () => {
      it('should compare correctly', () => {
        let result = sortString('a', 'b');
        expect(result).toBe(-1);
        result = sortString({
          currentItem: 'c',
          nextItem: 'b',
        });
        expect(result).toBe(1);
      });
    });
  });
  describe('given getObjectByDirection function', () => {
    describe('when isDescSortDirection equal true', () => {
      it('should return currentItem equal to 2 and nextItem equal to 1', () => {
        const result = getObjectByDirection({
          isDescSortDirection: true,
          currentItem: 1,
          nextItem: 2,
        });
        expect(result).toMatchObject({
          currentItem: 2,
          nextItem: 1,
        });
      });
    });
    describe('when isDescSortDirection equal false', () => {
      it('should return currentItem equal to 1 and nextItem equal to 2', () => {
        const result = getObjectByDirection({
          isDescSortDirection: false,
          currentItem: 1,
          nextItem: 2,
        });
        expect(result).toMatchObject({
          currentItem: 1,
          nextItem: 2,
        });
      });
    });
    describe('when unexpected parameters pass', () => {
      it('should return the object with undefined values', () => {
        const result = getObjectByDirection({
          isDescSortDirection: undefined,
          currentItem: undefined,
          nextItem: undefined,
        });
        expect(result).toMatchObject({
          currentItem: undefined,
          nextItem: undefined,
        });
      });
    });
  });
});
