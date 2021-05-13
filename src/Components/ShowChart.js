import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import '../CSS/App.css'
class Charts extends Component {
    chartRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            country: props.country,
            infected: props.infected,
            death: props.death,
            recovered: props.recovered,
            reportDate: '',
            config: ''
        }
        this.buildLineChart = this.buildLineChart.bind(this);
        this.buildBarChart = this.buildBarChart.bind(this);
    }

    async componentDidMount() {
        await this.getData();
        (this.state.country === 'Global') ? this.buildLineChart() : this.buildBarChart();
    }

    async getData() {
        const response = await fetch('https://covid19.mathdro.id/api/daily');
        const data = await response.json();
        let tempArr = [];
        let tempDeath = [];
        let tempInfected = [];
        for (var i = 0; i < data.length; i++) {
            tempArr.push(data[i].reportDate);
            tempDeath.push(data[i].deaths.total);
            tempInfected.push(data[i].confirmed.total);
        }
        this.setState({
            reportDate: tempArr,
            death: tempDeath,
            infected: tempInfected
        })
    }

    buildLineChart() {
        const data = {
            labels: this.state.reportDate,
            datasets: [{
                label: "Infected",
                data: this.state.infected,
                fill: false,
                borderColor: 'rgba(54, 162, 235)',
                tension: 0.1
            },
            {
                label: "Deaths",
                data: this.state.death,
                fill: false,
                borderColor: 'rgba(255, 99, 132)',
                tension: 0.1
            }
            ]
        };
        const config = {
            type: 'line',
            data,
            options: {
                responsive:true,
            }
        };
        new Chart(
            document.getElementById("myChart"),
            config
        );

    }
    buildBarChart() {
        const data = {
            labels: ["Infected", "Recovered", "Death"],
            datasets: [{
                axis: 'y',
                label: '',
                data: [this.props.infected, this.props.recovered, this.props.death],
                backgroundColor: [
                    'rgba(54, 162, 235,0.5)',
                    'rgba(75, 230, 150,0.5)',
                    'rgba(255, 99, 132,0.5)'],
                borderColor: [
                    'rgba(54, 162, 235)',
                    'rgba(75, 230, 150)',
                    'rgba(255, 99, 132)'],
                borderWidth: 1
            }]
        };
        const config = {
            type: 'bar',
            data,
            options: {
                responsive:true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
        new Chart(
            document.getElementById("myChart"),
            config
        );
    }

    render() {
        return (<div id="Chart">
            <canvas 
                id="myChart"></canvas>
        </div>
        );

    }
}
export default Charts;