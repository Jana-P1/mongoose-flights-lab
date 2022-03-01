import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({}, function(error, flights) {
    res.render('flights/index', {
      flights: flights,
      error: error,
      title: title
  })
  })
}

function newFlight(req, res) {
  res.render("flights/new", {
    title: "New Flight",
  })
}

function create(req, res) {
  if (req.body.departs === '') {
    delete req.body.departs
}
  const flight = new Flight(req.body)
  flight.save(function(error) {
  if (error) return res.render('flights/new')
  res.redirect("/flights")
})
}
export {
  index,
  newFlight as new,
  create,
}