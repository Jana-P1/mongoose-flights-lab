import { Flight } from "../models/flight.js"

function index(req, res) {
  Flight.find({}, function(error, flights) {
    res.render('flights/index', {
      flights: flights,
      error: error,
      title: "Mongoose Flights"
  })
  })
}

function newFlight(req, res) {
  res.render("flights/new")
}

function create(req, res) {
  for(let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  }
  // console.log(req.body)
  const flight = new Flight(req.body)
  flight.save(function(err) {
  if (err) return res.render("flights/new")
  res.redirect("/flights")
})
}
export {
  index,
  newFlight as new,
  create,
}