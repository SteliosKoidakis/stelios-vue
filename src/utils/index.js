import { find, lowerCase } from 'lodash';

const checkSearchResultByType = (item, text, searchableFields) => find(searchableFields,
  (searchableField) => lowerCase(item[searchableField]).indexOf(lowerCase(text)) > -1);

const sortNumber = (currentItem, nextItem) => parseFloat(currentItem) - parseFloat(nextItem);

const sortString = (currentItem, nextItem) => ((currentItem > nextItem) ? 1 : -1);

const sortNumberByDirection = (isDescSortDirection, currentItem, nextItem) => (isDescSortDirection ? sortNumber(nextItem, currentItem) : sortNumber(currentItem, nextItem));

const sortStringByDIrection = (isDescSortDirection, currentItem, nextItem) => (isDescSortDirection ? sortString(nextItem, currentItem) : sortString(currentItem, nextItem));

export {
  checkSearchResultByType,
  sortNumber,
  sortString,
  sortNumberByDirection,
  sortStringByDIrection
};
