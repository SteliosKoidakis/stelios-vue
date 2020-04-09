import { find, lowerCase } from 'lodash';

const checkSearchResultByType = (item, text, searchableFields) => find(searchableFields,
  (searchableField) => lowerCase(item[searchableField]).indexOf(lowerCase(text)) > -1);

export { checkSearchResultByType };
