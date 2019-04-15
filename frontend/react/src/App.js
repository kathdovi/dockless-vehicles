import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Here is a link to the API Documentation: https://dev.socrata.com/

    // Define variables we will need

    // These are constants, but could easily be changed to get data for a different time period.
    // They will be used in the query string for the API call.
    let start_time = "2019-03-08T00:00:00";
    let end_time = "2019-03-17T23:59:59";
    // We will count the total number of trips here
    let number_of_trips = 0;
    // Set up arrays for trips, distance & unique number of units so we can display them by day
    let trips_by_day = new Array(10).fill(0);
    let meters_by_day = new Array(10).fill(0);
    let unique_units = new Array(11);
    // We will be using sets to count the number of unique units. 
    // This is because sets take each item exactly one time - they won't add vehicle ids we've already added.
    let sets = new Array(11);
    for (let i = 0; i < sets.length; i++) {
      sets[i] = new Set();
    }
    // This will be used to add up all the miles in the miles array to display the overview/week data.
    function add(accumulator, a) {
      return accumulator + a;
    }
    // Query string for the api call: we declare it here so that we can change the start and end times if we want.
    let query_string = `https://data.austintexas.gov/resource/7d8e-dm7r.json?$where=start_time between '${start_time}' and '${end_time}'&$limit=500000`;
      axios
      .get(query_string)
      .then(res => {
        console.log(res);
        number_of_trips = res.data.length;
        // loop through response data and sort by date, count miles, trips, and unique vehicles
        for (let i = 0; i < res.data.length; i++) {
         if(res.data[i].start_time.includes("2019-03-08")) {
            trips_by_day[0] += 1
            meters_by_day[0] += parseInt(res.data[i].trip_duration)
            sets[0].add(res.data[i].device_id);
            sets[10].add(res.data[i].device_id);
         } else if (res.data[i].start_time.includes("2019-03-09")) {
            trips_by_day[1] += 1
            meters_by_day[1] += parseInt(res.data[i].trip_duration)
            sets[1].add(res.data[i].device_id);
            sets[10].add(res.data[i].device_id);
         } else if (res.data[i].start_time.includes("2019-03-10")) {
            trips_by_day[2] += 1
            meters_by_day[2] += parseInt(res.data[i].trip_duration)
            sets[2].add(res.data[i].device_id);
            sets[10].add(res.data[i].device_id);
         } else if (res.data[i].start_time.includes("2019-03-11")) {
            trips_by_day[3] += 1
            meters_by_day[3] += parseInt(res.data[i].trip_duration)
            sets[3].add(res.data[i].device_id);
            sets[10].add(res.data[i].device_id);
         } else if (res.data[i].start_time.includes("2019-03-12")) {
            trips_by_day[4] += 1
            meters_by_day[4] += parseInt(res.data[i].trip_duration)
            sets[4].add(res.data[i].device_id);
            sets[10].add(res.data[i].device_id);
         } else if (res.data[i].start_time.includes("2019-03-13")) {
            trips_by_day[5] += 1
            meters_by_day[5] += parseInt(res.data[i].trip_duration)
            sets[5].add(res.data[i].device_id);
            sets[10].add(res.data[i].device_id);
         } else if (res.data[i].start_time.includes("2019-03-14")) {
            trips_by_day[6] += 1
            meters_by_day[6] += parseInt(res.data[i].trip_duration)
            sets[6].add(res.data[i].device_id);
            sets[10].add(res.data[i].device_id);
         } else if (res.data[i].start_time.includes("2019-03-15")) {
            trips_by_day[7] += 1
            meters_by_day[7] += parseInt(res.data[i].trip_duration)
            sets[7].add(res.data[i].device_id);
            sets[10].add(res.data[i].device_id);
         } else if (res.data[i].start_time.includes("2019-03-16")) {
            trips_by_day[8] += 1
            meters_by_day[8] += parseInt(res.data[i].trip_duration)
            sets[8].add(res.data[i].device_id);
            sets[10].add(res.data[i].device_id);
         } else if (res.data[i].start_time.includes("2019-03-17")) {
            trips_by_day[9] += 1
            meters_by_day[9] += parseInt(res.data[i].trip_duration)
            sets[9].add(res.data[i].device_id);
            sets[10].add(res.data[i].device_id);
         }
        }
        // take the number of unique units from the size of the set and save it to unique units array
        unique_units = sets.map(set => set.size);
        // convert meters to miles & round to whole number
        const miles_by_day = meters_by_day.map( x => Math.round(x * 0.00062137))

        // Set state so we can access data to display
        this.setState({
          trips: {
            "March 8": trips_by_day[0],
            "March 9": trips_by_day[1],
            "March 10": trips_by_day[2],
            "March 11": trips_by_day[3],
            "March 12": trips_by_day[4],
            "March 13": trips_by_day[5],
            "March 14": trips_by_day[6],
            "March 15": trips_by_day[7],
            "March 16": trips_by_day[8],
            "March 17": trips_by_day[9],
            // all: number_of_trips
          },
          miles: {
            "March 8": miles_by_day[0],
            "March 9": miles_by_day[1],
            "March 10": miles_by_day[2],
            "March 11": miles_by_day[3],
            "March 12": miles_by_day[4],
            "March 13": miles_by_day[5],
            "March 14": miles_by_day[6],
            "March 15": miles_by_day[7],
            "March 16": miles_by_day[8],
            "March 17": miles_by_day[9],
            // all: miles_by_day.reduce(add)
          },
          units: {
            "March 8": unique_units[0],
            "March 9": unique_units[1],
            "March 10": unique_units[2],
            "March 11": unique_units[3],
            "March 12": unique_units[4],
            "March 13": unique_units[5],
            "March 14": unique_units[6],
            "March 15": unique_units[7],
            "March 16": unique_units[8],
            "March 17": unique_units[9],
            // all: unique_units[10]
          },
          totals: {
            trips: number_of_trips,
            miles: miles_by_day.reduce(add),
            units: unique_units[10]
          }
        });
        console.log(this.state.trips);
      });

      
  }

  render() {
    let trips = this.state.trips
    let miles = this.state.miles
    let units = this.state.units
    let totals = this.state.totals
    // let data = [
    //   {trips[0], miles[0], units[0]}
    // ]
    // console.log(data)
    return (
      <div className="App">
        <h2>SXSW Dockless Scooters</h2>
        <p className="App-intro">
          Week of March 8-17 2019
        </p>
        <Container>
          {this.state && this.state.totals &&
          <div className="weekly-summary"> 
            <h2> Weekly Summary </h2>
            <div> <span className="number"> {totals.trips} </span> total trips </div>
            <div> <span className="number"> {totals.miles} </span> total miles </div>
            <div> <span className="number"> {totals.units} </span> total units </div>
          </div>}
          { this.state && this.state.units &&
          <div className="pie-charts">
            <h3> Day by Day </h3>
            <Row>
              <Col md>
                <h4> Trips per Day </h4>
                <PieChart data={trips} /> 
              </Col>
              <Col md>
                <h4> Miles per Day </h4>
                <PieChart data={miles} /> 
              </Col>
              <Col md>
                <h4> Units per Day </h4>
                <PieChart data={units} /> 
              </Col>
            </Row> 
          </div>}
          { this.state && this.state.trips &&
          <div className="line-chart trips">
            <h4> Number of Trips per Day </h4>
            <LineChart data={trips} /> 
          </div> }
          { this.state && this.state.miles &&
          <div className="line-chart miles">
            <h4> Number of Miles per Day</h4>
            <LineChart data={miles} /> 
          </div>}
          { this.state && this.state.units &&
          <div className="line-chart units">
            <h4> Number of Units Used per Day</h4>
            <LineChart data={units} /> 
          </div>}
        </Container>
      </div>
    );
  }
}

export default App;
