// JavaScript to toggle light/dark mode
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check if the user already has a saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  document.getElementById('theme-toggle').checked = true; // Keep the toggle checked if dark mode is active
} else {
  body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
  // Toggle the dark and light mode on body
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  // Save the user's preference in localStorage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});