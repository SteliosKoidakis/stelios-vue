const ITEM_FIELDS = {
  title: 'title',
  description: 'description',
  price: 'price',
  email: 'email',
};

const SORT_DIRECTIONS = {
  asc: 'ASC',
  desc: 'DESC',
};

const SEARCH_FIELDS_ARRAY = [
  ITEM_FIELDS.title,
  ITEM_FIELDS.description,
  ITEM_FIELDS.price,
  ITEM_FIELDS.email,
];

const INITIAL_PAGE = 1;

export {
  INITIAL_PAGE,
  ITEM_FIELDS,
  SEARCH_FIELDS_ARRAY,
  SORT_DIRECTIONS
};
