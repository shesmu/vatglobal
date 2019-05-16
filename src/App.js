import React, { Component } from 'react';
import {DateRangePicker} from '@progress/kendo-react-dateinputs';
import {date_info, day_event} from './date_info';

function DaysElement(props){
  if(props.days != null){
    return <p className="dayInfo">There are {props.days} days between supplied range</p> 
  }
  return <p></p>
}

function LeapYearElement(props){
  if(props.leapYear === false){
    return <p className="dayInfo">The selected date range does not include a leap year</p>
  }
  else if(props.leapYear === true){
    return <p className="dayInfo">The selected date range includes a leap year</p>
  }
  else{
    return <p></p>
  }
}

function MondaysElement(props){
  if(props.mondays === 1){
    return <p className="dayInfo">There is 1 monday in given date range</p>
  }
  else if(props.mondays > 1){
    return <p className="dayInfo">There are {props.mondays} mondays in given date range</p>
  }
  else if(props.mondays === 0){
    return <p className="dayInfo">There are no mondays in given date range</p>
  }
  else{
    return <p></p>
  }
}

function EventElement(props){
  return <p className="dayInfo">{props.dayEvent}</p>
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days : null,
      leap_year : null,
      mondays : null,
      day_event : ""
    };
    this.handleDates = this.handleDates.bind(this);
  } 

  handleDates(event){
    var dates = event.value

    if(dates.start && dates.end){
      day_event(dates,(day_event) => {
        this.setState({day_event : day_event});
      })
      this.setState(date_info(dates))
    }
  }

  render() {
    return(
      <div className="calendar" >
        <DateRangePicker 
        onChange={this.handleDates}
      />

      <DaysElement days={this.state.days} />
      <LeapYearElement leapYear={this.state.leap_year} />
      <MondaysElement mondays={this.state.mondays} />
      <EventElement dayEvent={this.state.day_event} />
      </div>
    )
  }
}

export default App;
