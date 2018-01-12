let store = { deliveries: [], meals: [], employers: [], customers: [] }

let deliveryId = 0
let mealId = 0
let employerId = 0
let customerId = 0

class Delivery {
  constructor(meal, customer) {
    this.id = ++deliveryId
    store.deliveries.push(this)

    if (meal) {
      this.mealId = meal.id
    }

    if (customer) {
      this.customerId = customer.id
    }
  }

  setMeal(meal) {
    this.mealId = meal.id
  }

  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId
    })
  }

  setCustomer(customer) {
    this.customerId = customer.id
  }

  customer() {
    return store.customers.find(customer => {
      return customer.id === this.customerId
    })
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

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.mealId === this.id
    })
  }

  customers() {
    let result = []
    for (let delivery of this.deliveries()) {

        if (store.customers.includes(delivery.customer())) {
          result.push(delivery.customer())
        }
      }
    return result
  }
}

class Employer {
  constructor(name) {
      this.id = ++employerId
      this.name = name
      store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => {
      return customer.employerId === this.id
    })
  }

  deliveries() {
    let result = []
    for (let customer of this.employees()) {
      for (let element of customer.deliveries()) {
        result.push(element)
      }
    }
    return result
  }

  meals() {
    let result = []
    for (let delivery of this.deliveries()) {
      result.push(delivery.meal())
    }
      return [...new Set(result)]
  }

  mealTotals() {
    let total = {}
    const meals = this.deliveries().map(delivery => {
      return delivery.meal();
    })
    meals.forEach(function(meal) {
      total[meal.id] = 0
    })

    meals.forEach(function(meal) {
      total[meal.id] +=1
    })

    return total

  }
}

class Customer {
  constructor(name, employer) {
    this.id = ++customerId
    this.name = name
    store.customers.push(this)

    if (employer) {
      this.employerId = employer.id
    }
  }

  setEmployer(customer) {
    this.employerId = customer.id
  }

  employer() {
    return store.employers.find(employer => {
      return employer.id === this.employerId
    })
  }

  deliveries() {
    return store.deliveries.filter(delivery => {
      return delivery.customerId === this.id
    })
  }

  totalSpent() {
    let total = 0
    for (let delivery of this.deliveries()) {
        total += delivery.meal().price
    }
    return total
  }

  meals() {
    let result = []
    for (let delivery of this.deliveries()) {

        if (store.meals.includes(delivery.meal())) {
          result.push(delivery.meal())
        }
      }
    return result
  }
}
