const temperature = 29; // Change this value only
    updateGauge(temperature);

    function updateGauge(temperature) {
      const fill = document.querySelector('.fill');
      const text = document.querySelector('.text');

      // Update text content
      text.textContent = temperature + '°C';

      // Calculate fill levels based on temperature
      let iceLevel = 0;
      let moderateLevel = 0;
      let fireLevel = 0;

      if (temperature <= 0) {
        iceLevel = 100;
      } else if (temperature <= 25) {
        moderateLevel = (temperature / 25) * 100;
      } else {
        moderateLevel = 100;
        fireLevel = ((temperature - 25) / 25) * 100;
      }

      // Update gradient levels based on temperature
      fill.style.setProperty('--ice-level', iceLevel + '%');
      fill.style.setProperty('--moderate-level', moderateLevel + '%');
      fill.style.setProperty('--fire-level', fireLevel + '%');
      
      // Define colors for different temperature ranges
      const iceColor = '#B6B6B6'; // Ice color
      const moderateColor = '#D7D7D7'; // Moderate color
      const fireColor = '#ff7e5f'; // Fire color
      
      // Update colors based on temperature
      fill.style.setProperty('--ice-color', iceColor);
      fill.style.setProperty('--moderate-color', moderateColor);
      fill.style.setProperty('--fire-color', fireColor);
      
      // Rotate the gauge based on temperature (optional)
      const rotation = temperature <= 25 ? -90 + (temperature * 2) : 0;
      fill.style.setProperty('--rotate', rotation + 'deg');
    }
    
    