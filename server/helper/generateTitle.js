function generateTitle(content) {
  // If content is empty, return a default title
  if (!content) return "Default Title";

  // Get the first sentence or a portion of the first few words
  let title = content.split(".")[0]; // Split by period and take the first part
  title = title.trim(); // Remove extra spaces

  // If the title is very short (less than 10 characters), take the first few words
  if (title.length < 10) {
    title = content.split(" ").slice(0, 5).join(" ") + "..."; // First 5 words
  }

  return title.charAt(0).toUpperCase() + title.slice(1); // Capitalize the first letter
}

module.exports = { generateTitle };
