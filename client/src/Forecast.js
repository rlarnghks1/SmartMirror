import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { getForecast, getIconClass } from './lib/yahoo_weather';
import moment from 'moment';

const styles = {
  container: {
    marginLeft: 0,
    marginRight: 40
  },
  weatherImg: {
  	position: 'absolute',
  	right: '40px'
  },
  forecastText: {
  	color: 'white',
    fontSize: '1.5em',
    margin: 0,
    padding: 0
  },
  foreacstIcon: {
  	color: 'white',
    fontSize: '1.8em',
    margin: 0,
    padding: 0,
    textAlign: 'center'
  },
  foreacstTemp: {
  	color: 'white',
    fontSize: '1.5em',
    margin: 0,
    padding: 0,
    textAlign: 'right',
    marginRight: 40
  },
  locationLabel: {
  	color: 'white',
    fontSize: '2.5em',
    margin: 0,
    padding: 0,
    textAlign: 'center',
    marginBottom: 20
  }
}

export default class Forecast extends React.Component {
  constructor(props) {
    super(props);
    const dummy = JSON.parse("[{\"code\":\"30\",\"date\":\"06 Jan 2017\",\"day\":\"Fri\",\"high\":\"-3\",\"low\":\"-7\",\"text\":\"Partly Cloudy\"},{\"code\":\"14\",\"date\":\"07 Jan 2017\",\"day\":\"Sat\",\"high\":\"1\",\"low\":\"-3\",\"text\":\"Snow Showers\"},{\"code\":\"28\",\"date\":\"08 Jan 2017\",\"day\":\"Sun\",\"high\":\"1\",\"low\":\"-4\",\"text\":\"Mostly Cloudy\"},{\"code\":\"28\",\"date\":\"09 Jan 2017\",\"day\":\"Mon\",\"high\":\"2\",\"low\":\"1\",\"text\":\"Mostly Cloudy\"},{\"code\":\"28\",\"date\":\"10 Jan 2017\",\"day\":\"Tue\",\"high\":\"3\",\"low\":\"1\",\"text\":\"Mostly Cloudy\"},{\"code\":\"28\",\"date\":\"11 Jan 2017\",\"day\":\"Wed\",\"high\":\"2\",\"low\":\"1\",\"text\":\"Mostly Cloudy\"},{\"code\":\"23\",\"date\":\"12 Jan 2017\",\"day\":\"Thu\",\"high\":\"3\",\"low\":\"2\",\"text\":\"Breezy\"},{\"code\":\"28\",\"date\":\"13 Jan 2017\",\"day\":\"Fri\",\"high\":\"2\",\"low\":\"1\",\"text\":\"Mostly Cloudy\"},{\"code\":\"30\",\"date\":\"14 Jan 2017\",\"day\":\"Sat\",\"high\":\"1\",\"low\":\"-1\",\"text\":\"Partly Cloudy\"}]");
    this.state = {
    	forecast: dummy
    };
    this.refreshForecast = this.refreshForecast.bind(this);
    this.handleNewForecast = this.handleNewForecast.bind(this);
  }

  componentDidMount() {
    /*this.timerID = setInterval(
      () => this.refreshForecast(),
      1000 * 60 * 10
    );
    this.refreshForecast();*/
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  refreshForecast() {
  	console.log('Update forecast');
  	getForecast()
  	.then(this.handleNewForecast)
  	.catch((err) => console.log(err));
  }

  handleNewForecast(forecast){
  	console.log(forecast);
  	this.setState({
  		forecast: forecast.slice(1)
  	})
  }

  render() {
  	console.log('forecasts', this.state.forecast);

    return (
      <div style={styles.container}>
	      <p style={styles.locationLabel}> Lund </p>
	      {this.state.forecast.map(function(object, i){
	      	if(i > 4) return null;
	        return (
	        	<Row key={i}>
		          <Col xs={4}>
		          	<div style={styles.forecastText}>
		          		{moment(new Date(object.date)).format('dddd')}
		          	</div>
		          </Col>
		          <Col style={{ textAlign: 'center' }}xs={4}>
		          	<i style={styles.foreacstIcon} className={getIconClass(object.code)}></i>
		          </Col>
		          <Col xs={4}>
		          	<div style={styles.foreacstTemp}>
		          		{object.high} / {object.low}
		          	</div>
		          </Col>
		        </Row>
	        	)
	    	})}
      </div>
    );
  }
}