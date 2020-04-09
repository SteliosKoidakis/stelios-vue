import { checkSearchResultByType } from '@/utils';

import ItemsListModule from './ItemsListModule';

jest.mock('@/utils', () => ({
  checkSearchResultByType: jest.fn(),
}));

describe('Give ItemsListModule', () => {
  const {
    state,
    mutations,
    getters,
  } = ItemsListModule;

  const mockInitialState = {
    items: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when we initialize the module', () => {
    it('should have the correct state', () => {
      expect(state).toEqual(mockInitialState);
    });
  });
  describe('Give setItems mutation', () => {
    describe('when an array pass as a parameter', () => {
      it('should mutate correct the state', () => {
        const mockItems = [{
          title: 'test',
        }];
        mutations.setItems(state, mockItems);
        expect(state.items).toEqual(mockItems);
      });
    });
    describe('when an none array parameter pass', () => {
      it('should mutate the state with an empty array', () => {
        mutations.setItems(state, 'test');
        expect(state.items).toEqual([]);
      });
    });
  });
  describe('Give getItemsByFilters getter', () => {
    describe('when a string text and an array of searchableFields pass', () => {
      it('should trigger checkSearchResultByType', () => {
        const stateWithItems = {
          items: [{
            title: 'test',
          }],
        };
        const text = 'test';
        const searchableFields = ['title'];

        getters.getItemsByFilters(stateWithItems)(text, searchableFields);

        expect(checkSearchResultByType).toHaveBeenCalled();
      });
      it('should trigger checkSearchResultByType for state.lenth times', () => {
        const stateWithItems = {
          items: [{
            title: 'test',
          },
          {
            title: 'test',
          },
          ],
        };
        const text = 'test';
        const searchableFields = ['title'];

        getters.getItemsByFilters(stateWithItems)(text, searchableFields);

        expect(checkSearchResultByType).toHaveBeenCalledTimes(stateWithItems.items.length);
      });
      it('should filter the array items', () => {
        const stateWithItems = {
          items: [{
            title: 'test',
          },
          {
            title: 'test',
          },
          ],
        };
        const text = 'test';
        const searchableFields = ['title'];
        jest.spyOn(Array.prototype, 'filter');

        getters.getItemsByFilters(stateWithItems)(text, searchableFields);

        expect(Array.prototype.filter).toHaveBeenCalled();
      });
    });
  });
});
