import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

function index(req, res) {
  Flight.find({}, function(error, flights) {
    res.render('flights/index', {
      flights: flights,
      error: error,
      title: "All Flights"
  })
  })
}

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add New Flight"
  })
}

function create(req, res) {
  for(let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  }
  const flight = new Flight(req.body)
  flight.save(function(error) {
  if (error) return res.render("flights/new")
  res.redirect(`flights/${flight._id}`)
})
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate("meals")
  .exec(function(error, flight) {
    Meal.find({_id: {$nin: flight.mealsId}}, function(error, meals) {
      res.render("flights/show", {
        title: "Flight Detail",
        flight: flight,
        meals
    })
    })
  })
}

function addTicket(req, res) {
  Flight.findById(req.params.id, function (error, flight) {
    flight.tickets.push(req.body)
    flight.save(function(error) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addToMeal(req, res) {
  Flight.findById(req.params.id, function(error, flight) {
    flight.meals.push(req.body.mealId)
    console.log(req.body)
    flight.save(function(error) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  addTicket,
  addToMeal
}