const food = [
  { name: "паста папперделе", weight: 450, price: 550, quantity: 10 },
  { name: "салат цезарь", weight: 350, price: 400, quantity: 9 },
  { name: "фалафель с хумусом", weight: 250, price: 50, quantity: 11 },
];

// найти вес вещей цена которых больше 200 и количество больше 8

const getWeightOfFood = (arr) => {
  const filteredFood = arr.filter(
    (food) => food.price >= 200 && food.quantity >= 8
  );
  const weightOfFood = filteredFood.reduce(
    (acc, food) => (acc += food.weight * food.quantity),
    0
  );
  return weightOfFood;
};

console.log(getWeightOfFood(food));
