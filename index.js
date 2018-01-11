let store = { deliveries: [], meals: [] }

let deliveryId = 0
let mealId = 0

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    this.meal = meal
    this.customer = customer
    store.deliveries.push(this)
  }

}

class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort(function(meal1, meal2) {
    return meal2.price - meal1.price;
    });
  }
}
