const BACKEND_URL = 'http://127.0.0.1:8000';

function createResultCard(site){
  const card = document.createElement('div');
  card.className = 'result-card';

  const title = document.createElement('h3'); title.textContent = site.name || 'Untitled';
  const desc = document.createElement('p'); desc.textContent = site.description || '';
  const cat = document.createElement('small'); cat.textContent = site.category || '';

  const link = document.createElement('a');
  const href = (site.url || '').trim();
  link.textContent = href || 'No URL';
  link.href = href && (/^https?:\/\//i.test(href)) ? href : '#';
  if (link.href !== '#') { link.target='_blank'; link.rel='noopener noreferrer'; }
  link.className = 'url';

  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(cat);
  card.appendChild(link);

  return card;
}

async function searchWebsites() {
  const queryInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const sampleBtn = document.getElementById('sampleBtn');
  const backendStatus = document.getElementById('backendStatus');
  const spinner = document.getElementById('searchSpinner');
  const query = queryInput.value.trim();
  const resultsDiv = document.getElementById('results');

  backendStatus.style.display = 'none';
  sampleBtn.style.display = 'none';

  if (!query){
    alert('Enter a search topic');
    return;
  }

  searchBtn.disabled = true; searchBtn.setAttribute('aria-busy', 'true'); spinner.style.display = 'inline-block';
  resultsDiv.innerHTML = '';

  try{
    const res = await fetch(`${BACKEND_URL}/websites/search?query=${encodeURIComponent(query)}`);
    if(!res.ok) throw new Error(`Server returned ${res.status}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0){
      resultsDiv.textContent = 'No results found.';
      return;
    }

    const frag = document.createDocumentFragment();
    data.forEach(site => frag.appendChild(createResultCard(site)));
    resultsDiv.appendChild(frag);
  }catch(err){
    resultsDiv.textContent = `Error: ${err.message}`;
    backendStatus.style.display = 'block'; backendStatus.textContent = `Backend unreachable or returned an error: ${err.message}`;
    sampleBtn.style.display = 'inline-block';
  }finally{
    searchBtn.disabled = false; searchBtn.removeAttribute('aria-busy'); spinner.style.display = 'none';
  }
}

function showSampleResults(){
  const sample = [
    {name: "OWASP", description: "Open Web Application Security Project - resources and guides.", category: "Learning", url: "https://owasp.org"},
    {name: "VirusTotal", description: "Free file and URL scanning.", category: "Tools", url: "https://www.virustotal.com"},
    {name: "Krebs on Security", description: "Security news and analysis by Brian Krebs.", category: "News", url: "https://krebsonsecurity.com"},
    {name: "Mozilla Security", description: "Browser security and privacy resources.", category: "Learning", url: "https://www.mozilla.org/security"},
    {name: "SecurityTrails", description: "Threat intel and domain research.", category: "Tools", url: "https://securitytrails.com"}
  ];

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  const frag = document.createDocumentFragment();
  sample.forEach(s => frag.appendChild(createResultCard(s)));
  resultsDiv.appendChild(frag);
}

// attach event listeners and set active nav link
document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const sampleBtn = document.getElementById('sampleBtn');
  const input = document.getElementById('searchInput');

  if (searchBtn) searchBtn.addEventListener('click', searchWebsites);
  if (sampleBtn) sampleBtn.addEventListener('click', showSampleResults);

  // auto-run query from URL
  const params = new URLSearchParams(window.location.search);
  const q = params.get('query');
  if (q) { input.value = q; setTimeout(() => searchWebsites(), 40); }

  // nav active
  document.querySelectorAll('.navbar a').forEach(a => {
    try{ if (window.location.pathname.endsWith(a.getAttribute('href'))) a.classList.add('active'); }catch(e){}
  });
});
