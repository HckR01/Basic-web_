// script.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded. Ready to cheer your love up!");

  // Example: Redirect after 3 seconds
  // setTimeout(() => {
  //   window.location.href = "cards.html";
  // }, 3000);

  // Or you can call this function when clicking a button
  const goToCards = () => {
    window.location.href = "cards.html";
  };

  // You can export this function globally if needed
  window.goToCards = goToCards;

  // New: Add event listener to "Next" button for going to next-card.html
  const nextButton = document.querySelector('a[href="next-card.html"] button');

  if (nextButton) {
    nextButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "next-card.html";
    });
  }
});
