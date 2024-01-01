  // Function to toggle fullscreen mode
  function toggleFullscreen(element) {
    if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Add double-click event listeners to divs
const divs = document.querySelectorAll('div');
divs.forEach(div => {
    div.addEventListener('dblclick', () => {
        toggleFullscreen(div);
    });
});

const scaledDiv = document.querySelector('.scaledDiv');
// const iframe = scaledDiv.querySelector('iframe');

// Function to scale down contents
// function scaleContents() {
//     iframe.style.transform = 'scale(0.8)';
//     iframe.style.width = '125%';
//     iframe.style.height = '125%';
// }

// // Call the function to scale down on page load
// scaleContents();

