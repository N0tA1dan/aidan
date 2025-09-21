document.addEventListener('DOMContentLoaded', () => {
  const pixelOverlay = document.getElementById('pixel-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Increased pixel size for a coarser look
  const pixelSize = 40; 

  // Function to create and add the pixel grid to the overlay
  function createPixelGrid() {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const numPixelsX = Math.ceil(viewportWidth / pixelSize);
      const numPixelsY = Math.ceil(viewportHeight / pixelSize);
      const totalPixels = numPixelsX * numPixelsY;

      pixelOverlay.innerHTML = '';
      const pixels = [];

      for (let i = 0; i < totalPixels; i++) {
          const pixel = document.createElement('div');
          pixel.classList.add('pixel');
          pixel.style.width = `${pixelSize}px`;
          pixel.style.height = `${pixelSize}px`;
          pixels.push(pixel);
          pixelOverlay.appendChild(pixel);
      }
      return pixels;
  }

  // Function to shuffle an array for a random effect
  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }

  // Function to start the pixel disintegration transition
  function pixelDisintegrate(pixels) {
      return new Promise(resolve => {
          const shuffledPixels = shuffle([...pixels]);
          let disintegratedCount = 0;
          shuffledPixels.forEach((pixel, index) => {
              setTimeout(() => {
                  pixel.classList.remove('black');
                  disintegratedCount++;
                  if (disintegratedCount === shuffledPixels.length) {
                      resolve();
                  }
              }, index * 1); // Reduced the delay for a faster animation
          });
      });
  }

  // Function to start the pixel fill transition
  function pixelFill(pixels) {
      return new Promise(resolve => {
          const shuffledPixels = shuffle([...pixels]);
          let filledCount = 0;
          shuffledPixels.forEach((pixel, index) => {
              setTimeout(() => {
                  pixel.classList.add('black');
                  filledCount++;
                  if (filledCount === shuffledPixels.length) {
                      resolve();
                  }
              }, index * 1); // Reduced the delay for a faster animation
          });
      });
  }

  // On initial page load, start the disintegration effect
  const pixelsOnLoad = createPixelGrid();
  pixelsOnLoad.forEach(pixel => pixel.classList.add('black')); // All pixels are black initially
  pixelDisintegrate(pixelsOnLoad);

  // Intercept clicks on navigation links
  navLinks.forEach(link => {
      link.addEventListener('click', async (e) => {
          e.preventDefault(); // Stop the default navigation
          const destinationURL = e.currentTarget.href;

          const pixelsForFill = createPixelGrid();
          await pixelFill(pixelsForFill);
          
          // Navigate to the next page after the transition is complete
          window.location.href = destinationURL;
      });
  });
});