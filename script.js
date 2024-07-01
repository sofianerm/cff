function fetchTrainData() {
    fetch('https://transport.opendata.ch/v1/stationboard?id=8517142&limit=15')
    .then(response => response.json())
    .then(data => {
        const stationboard = document.getElementById('stationboard');
        stationboard.innerHTML = '';

        data.stationboard.forEach(train => {
            const row = document.createElement('div');
            row.className = 'train-row';
            
            const departureTime = new Date(train.stop.departure);
            const hours = departureTime.getHours().toString().padStart(2, '0');
            const minutes = departureTime.getMinutes().toString().padStart(2, '0');

            row.innerHTML = `
                <div class="status"></div>
                <div class="time">${hours}:${minutes}</div>
                <div class="destination">
                    ${train.to}
                    <div class="train-info">${train.category} | ${train.number}</div>
                </div>
                <div class="platform">${train.stop.platform || 'Voie'}</div>
            `;
            stationboard.appendChild(row);
        });
    });
}

fetchTrainData();
setInterval(fetchTrainData, 60000); // Rafraîchit toutes les minutes