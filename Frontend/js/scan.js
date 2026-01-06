// BASE backend URL ONLY
const BACKEND_URL = 'http://127.0.0.1:8000';

function escapeHtml(s){
  if(!s && s !== 0) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderScanResult(data){
  const statusDiv = document.getElementById("scanStatus");
  const resultDiv = document.getElementById("scanResult");

  const status = data.status || data.state || 'Unknown';
  const filename = data.filename || '';
  const content_type = data.content_type || '';
  const size_bytes = data.file_size || data.size_bytes || 0;
  const sha256 = data.sha256_hash || data.sha256 || '';
  const explanation =
    data.explanation ||
    data.explaination ||   // 👈 backend typo handled
    data.explain ||
    '';

  let badgeClass = "safe";
  const st = status.toLowerCase();
  if (st.includes("risk")) badgeClass = "risky";
  else if (st.includes("suspicious")) badgeClass = "suspicious";

  statusDiv.innerHTML = `
    Result: <span class="badge ${badgeClass}">
      ${escapeHtml(status)}
    </span>
  `;

  resultDiv.innerHTML = `
    <table>
      <tr><td>File Name</td><td>${escapeHtml(filename)}</td></tr>
      <tr><td>File Type</td><td>${escapeHtml(content_type)}</td></tr>
      <tr><td>File Size</td><td>${escapeHtml(size_bytes)} bytes</td></tr>
      <tr><td>SHA-256</td><td class="hash">${escapeHtml(sha256)}</td></tr>
    </table>

    <h3>AI Explanation</h3>
    <p>${escapeHtml(explanation)}</p>
  `;

  // add copy button next to hash
  const hashEl = resultDiv.querySelector('.hash');
  if (hashEl){
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.className = 'copy-btn';
    copyBtn.style.marginLeft = '8px';
    copyBtn.style.padding = '4px 8px';
    copyBtn.style.borderRadius = '6px';
    copyBtn.style.border = 'none';
    copyBtn.style.background = 'rgba(255,255,255,0.03)';
    copyBtn.style.color = 'var(--accent)';
    copyBtn.style.cursor = 'pointer';
    copyBtn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(sha256); copyBtn.textContent = 'Copied'; setTimeout(()=> copyBtn.textContent='Copy',1500);} catch(e){copyBtn.textContent='Failed'}
    });
    hashEl.appendChild(copyBtn);
  }
}

async function scanFile() {
  const fileInput = document.getElementById("fileInput");
  const statusDiv = document.getElementById("scanStatus");
  const resultDiv = document.getElementById("scanResult");
  const scanBtn = document.getElementById("scanBtn");
  const backendStatus = document.getElementById("backendStatus");
  const sampleScanBtn = document.getElementById("sampleScanBtn");
  const spinner = document.getElementById('scanSpinner');

  backendStatus.style.display = 'none';
  sampleScanBtn.style.display = 'none';

  if (!fileInput.files.length) {
    alert("Please select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  spinner.style.display = 'inline-block';
  scanBtn.disabled = true;
  scanBtn.setAttribute('aria-busy', 'true');

  statusDiv.textContent = "Uploading & analyzing with AI...";
  resultDiv.innerHTML = "";

  try {
    // Try new endpoint first for better consistency
    let response = await fetch(`${BACKEND_URL}/scan/file`, {
      method: "POST",
      body: formData
    });

    // fallback to legacy endpoint if 404
    if (response.status === 404) {
      response = await fetch(`${BACKEND_URL}/scan/upload`, {
        method: "POST",
        body: formData
      });
    }

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    renderScanResult(data);

  } catch (err) {
    statusDiv.textContent = `Error: ${err.message}`;
    backendStatus.style.display = 'block';
    backendStatus.textContent =
      `Backend unreachable or returned an error: ${err.message}`;
    sampleScanBtn.style.display = 'inline-block';
  } finally {
    scanBtn.disabled = false;
    scanBtn.removeAttribute('aria-busy');
    spinner.style.display = 'none';
  }
}

function showSampleScan(){
  const sample = {
    filename: "example.txt",
    content_type: "text/plain",
    size_bytes: 1234,
    sha256: "abc123def456...",
    status: "Safe",
    explanation: "This is a sample scan result for offline testing."
  };
  renderScanResult(sample);
}

// attach event listeners and nav active
document.addEventListener('DOMContentLoaded', ()=>{
  const scanBtn = document.getElementById('scanBtn');
  const sampleBtn = document.getElementById('sampleScanBtn');
  const fileDrop = document.getElementById('fileDrop');
  const fileInput = document.getElementById('fileInput');

  if (scanBtn) scanBtn.addEventListener('click', scanFile);
  if (sampleBtn) sampleBtn.addEventListener('click', showSampleScan);

  // drag-drop support
  if (fileDrop){
    fileDrop.addEventListener('dragover', (e)=>{e.preventDefault(); fileDrop.style.opacity='0.9'});
    fileDrop.addEventListener('dragleave', ()=>{fileDrop.style.opacity='1'});
    fileDrop.addEventListener('drop', (e)=>{e.preventDefault(); if (e.dataTransfer.files.length) fileInput.files = e.dataTransfer.files;});
  }

  // nav active
  document.querySelectorAll('.navbar a').forEach(a => {
    try{ if (window.location.pathname.endsWith(a.getAttribute('href'))) a.classList.add('active'); }catch(e){}
  });
});
