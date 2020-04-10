import { SORT_DIRECTIONS } from '@/constants';

import {
  some,
  lowerCase,
} from 'lodash';

const checkSearchResultByType = (item, text, searchableFields) => some(searchableFields,
  (searchableField) => lowerCase(item[searchableField]).indexOf(lowerCase(text)) > -1);

const sortNumber = ({ currentItem, nextItem }) => parseFloat(currentItem) - parseFloat(nextItem);

const sortString = ({ currentItem, nextItem }) => ((currentItem > nextItem) ? 1 : -1);

const getObjectByDirection = ({
  isDescSortDirection = SORT_DIRECTIONS.asc,
  currentItem,
  nextItem,
}) => ({
  currentItem: isDescSortDirection ? nextItem : currentItem,
  nextItem: isDescSortDirection ? currentItem : nextItem,
});

export {
  checkSearchResultByType,
  sortNumber,
  sortString,
  getObjectByDirection
};
