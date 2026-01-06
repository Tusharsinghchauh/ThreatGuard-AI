async function loadTopic(topic) {
  const contentDiv = document.getElementById("topicContent");
  contentDiv.innerHTML = "<p>Loading content...</p>";

  const res = await fetch(
    `http://127.0.0.1:8000/learn/topic?name=${topic}`
  );

  const data = await res.json();

  if (data.error) {
    contentDiv.innerHTML = "<p>Topic not found.</p>";
    return;
  }

  let html = `
    <h2>${data.title}</h2>
    <p>${data.intro}</p>

    <h3>✔ Safety Tips</h3>
    <ul>
  `;

  data.tips.forEach(tip => {
    html += `<li>${tip}</li>`;
  });

  html += `</ul><h3>🔗 Helpful Websites</h3><ul>`;

  data.websites.forEach(site => {
    html += `
      <li>
        <a href="${site}" target="_blank">${site}</a>
      </li>
    `;
  });

  html += `</ul>`;

  contentDiv.innerHTML = html;
}
