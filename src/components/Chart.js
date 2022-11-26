import React, { useMemo } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import {DateTime} from 'luxon'

  ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
  );

/**
 * @param {{
 * results: number[]
 * real: number[]
 * input: number[]
 * title: string
 * xLabel: string
 * }} props
 */
export default function Chart({ results, title, real, input, xLabel }) {
	const labels = useMemo(() => [
		...Array(48).fill(0).map((_,i) => DateTime.now().minus({hours: 24 - i})),
		...Array(48).fill(0).map((_,i) => DateTime.now().plus({hours: 24 + i}))
	].map((el, i) => el.toFormat('h a')), [])

	const options = useMemo(() => ({
		responsive: true,
		plugins: {
				legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: `${title} Forecasting`,
			},
		},
		scales: {
			x: {
			  title: {
				display: true,
				text: 'Time'
			  },
			  ticks: {
				callback: (value) => {
					return labels[value]
				} 
			  }
			},
			y: {
			  title: {
				display: true,
				text: xLabel
			  }
			}
		}
		}), [title, xLabel])

	const data = useMemo(() => ({
		labels,
		datasets: [
			{
			  label: 'Results',
			  data: [...Array(48),...results],
			  borderColor: 'rgb(255, 99, 132)',
			  backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
			  label: 'Real',
			  data: real,
			  borderColor: 'rgb(22, 99, 132)',
			  backgroundColor: 'rgba(22, 99, 132, 0.5)',
			},
			{
			  label: 'Input',
			  data: input,
			  borderColor: 'rgb(213, 44, 232)',
			  backgroundColor: 'rgba(213, 44, 232, 0.5)',
			},
		  ],
	}), [labels, results, real, input])


	return <Line options={options} data={data} />
}

	// const options = useMemo(() => ({
	// 	animationEnabled: true,
	// 	exportEnabled: true,
	// 	theme: "light2", // "light1", "dark1", "dark2"
	// 	title: {
	// 		text: "CO2 Forecasting"
	// 	},
	// 	axisY: {
	// 		title: "CO2 (ppm)",
	// 	},
	// 	axisX: {
	// 		title: "Time (1 = 30 min)",
	// 		interval: 2
	// 	},
	// 	data: [{
	// 		type: "line",
	// 		toolTipContent: "Week {x}: {y}%",
	// 		dataPoints: y.map((el, i) => [i, el])
	// 	}]
	// }), [y])