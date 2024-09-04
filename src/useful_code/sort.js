const compare_string = (left, right) =>
  left < right ? -1 : left > right ? 1 : 0;

const compare_numb = (left, right) => left - right;

const compare_field = (field, compare) => (left, right) =>
  compare(left[field], right[field]);

const compare_combine =
  (...comparators) =>
  (left, right) => {
    for (const compare of comparators) {
      const res = compare(left, right);
      if (res) return res;
    }
    return 0;
  };

const compare_reverse = (compare) => (left, right) => compare(right, left);

const compare_user = compare_combine(
  compare_field("salary", compare_reverse(compare_numb)),
  compare_field("name", new Intl.Collator().compare),
  compare_field("id", compare_string)
);

items.sort(compare_user);
