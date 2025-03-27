<<<<<<< HEAD
const socket = new WebSocket("ws://localhost:8080");
const ctx = document.getElementById('dataChart').getContext('2d');

let labels = [];
let dataPoints = [];

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Received Data',
            data: dataPoints,
            borderColor: 'blue',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: 'red',
            fill: false,
            tension: 0
        }]
    },
    options: {
        scales: {
            x: { type: 'linear', position: 'bottom', ticks: { stepSize: 1 } },
            y: { beginAtZero: true }
        }
    }
});

socket.onopen = () => console.log("Connected to WebSocket Server");

socket.onmessage = (event) => {
    let newData = Number(event.data);
    let index = labels.length;

    labels.push(index);
    dataPoints.push(newData);

    chart.data.labels = labels;
    chart.data.datasets[0].data = dataPoints;
    chart.update();
};

socket.onerror = (error) => console.error("WebSocket Error:", error);
socket.onclose = () => console.log("WebSocket closed.");
=======
const socket = new WebSocket("ws://localhost:8080");
const ctx = document.getElementById('dataChart').getContext('2d');

let labels = [];
let dataPoints = [];

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Received Data',
            data: dataPoints,
            borderColor: 'blue',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: 'red',
            fill: false,
            tension: 0
        }]
    },
    options: {
        scales: {
            x: { type: 'linear', position: 'bottom', ticks: { stepSize: 1 } },
            y: { beginAtZero: true }
        }
    }
});

socket.onopen = () => console.log("Connected to WebSocket Server");

socket.onmessage = (event) => {
    let newData = Number(event.data);
    let index = labels.length;

    labels.push(index);
    dataPoints.push(newData);

    chart.data.labels = labels;
    chart.data.datasets[0].data = dataPoints;
    chart.update();
};

socket.onerror = (error) => console.error("WebSocket Error:", error);
socket.onclose = () => console.log("WebSocket closed.");
>>>>>>> fc891de (v1.0.0)
