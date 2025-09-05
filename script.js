// Placeholder for hero animation or scroll effects
document.addEventListener('DOMContentLoaded', function () {
    console.log("Page loaded. JS is connected.");
});
// document.addEventListener("DOMContentLoaded", () => {
//   const counters = document.querySelectorAll(".counter");

//   counters.forEach(counter => {
//     const updateCount = () => {
//       const target = +counter.getAttribute("data-target");
//       const count = +counter.innerText;

//       const increment = target / 100;

//       if (count < target) {
//         counter.innerText = Math.ceil(count + increment);
//         setTimeout(updateCount, 20);
//       } else {
//         counter.innerText = target;
//       }
//     };

//     updateCount();
//   });
// });
// status bar animation 
// const counters = document.querySelectorAll('.counter');
// counters.forEach(counter => {
//   const updateCount = () => {
//     const target = +counter.getAttribute('data-target');
//     const count = +counter.innerText;
//     const increment = target / 100;

//     if(count < target) {
//       counter.innerText = Math.ceil(count + increment);
//       setTimeout(updateCount, 30);
//     } else {
//       counter.innerText = target;
//     }
//   };
//   updateCount();
// });

const statusItems = document.querySelectorAll('.status-item'); // Get all status item boxes

statusItems.forEach(item => {
    // Initialize a flag on each item to track if it has been animated
    item.dataset.animated = "false"; 
    
    // Get the counter element and its target value for this specific item
    const counterElement = item.querySelector('.counter');
    const target = +counterElement.getAttribute('data-target');

    let animationFrameId; // To store the requestAnimationFrame ID

    const startCounterAnimation = () => {
        // Only animate if it hasn't been animated before
        if (item.dataset.animated === "true") {
            return; // Exit if already animated
        }

        let count = 0;
        const duration = 1000; // Animation duration in milliseconds
        const startTime = performance.now(); // Get the current time

        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Progress from 0 to 1

            count = progress * target;
            counterElement.innerText = Math.ceil(count);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(updateCount);
            } else {
                counterElement.innerText = target; // Ensure it reaches the exact target
                item.dataset.animated = "true"; // Mark as animated
            }
        };
        animationFrameId = requestAnimationFrame(updateCount); // Start the animation
    };

    const resetCounter = () => {
        // Cancel any ongoing animation
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        // Reset the counter text to 0
        counterElement.innerText = 0;
        // Reset the animated flag
        item.dataset.animated = "false"; 
    };

    // Add event listeners for hover
    item.addEventListener('mouseenter', startCounterAnimation);
    // Optional: Reset counter when mouse leaves (if you want it to recount on next hover)
    // If you want it to count once and stay, remove the mouseleave listener.
    // item.addEventListener('mouseleave', resetCounter);
});
// what we do page
const timestamp = event?.date?.seconds
  ? new Date(event.date.seconds * 1000)
  : event?.date instanceof Date
    ? event.date
    : null;

const date = timestamp ? timestamp.toLocaleDateString() : "Invalid date";
