const fs = require('fs');

const rawData = fs.readFileSync('C:\\Users\\ari_chii\\.gemini\\antigravity-ide\\brain\\34964797-c669-4e8c-8ae1-16d1c8a4899c\\scratch\\screen2.html', 'utf16le');
let html = rawData.toString();

// Replace class with className
html = html.replace(/class=/g, 'className=');
// Replace for with htmlFor
html = html.replace(/for=/g, 'htmlFor=');
// Replace tabindex with tabIndex
html = html.replace(/tabindex=/g, 'tabIndex=');
// Replace html comments with jsx comments
html = html.replace(/<!--/g, '{/*');
html = html.replace(/-->/g, '*/}');

// Extract body content if present, else use all
let bodyContent = html;
if (html.includes('<body')) {
    const startIdx = html.indexOf('<body');
    const firstGt = html.indexOf('>', startIdx);
    const endIdx = html.indexOf('</body>');
    if (firstGt !== -1 && endIdx !== -1) {
        bodyContent = html.substring(firstGt + 1, endIdx);
    }
}

// Remove scripts
bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Self-closing tags (img, input, hr, br)
bodyContent = bodyContent.replace(/<(img|input|br|hr)([^>]*[^\/])>/gi, '<$1$2 />');

// Remove extra SVG styles if they cause issues, or style=
bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, p1) => {
    const styleObj = p1.split(';').filter(Boolean).map(s => {
        const [k, v] = s.split(':').map(x => x.trim());
        if (!k) return '';
        const camelK = k.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return `'${camelK}': '${v}'`;
    }).filter(Boolean).join(', ');
    return `style={{${styleObj}}}`;
});

const componentCode = `export default function Dashboard() {
  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <div className="w-full flex flex-col min-h-screen">
        <main className="flex-1 w-full flex flex-col">
          ${bodyContent}
        </main>
      </div>
    </div>
  );
}`;

fs.mkdirSync('C:\\proyek\\kos-in\\src\\pages\\dashboard', { recursive: true });
fs.writeFileSync('C:\\proyek\\kos-in\\src\\pages\\dashboard\\page.jsx', componentCode, 'utf8');

const appJsxCode = `import Dashboard from './pages/dashboard/page';

function App() {
  return (
    <Dashboard />
  );
}

export default App;
`;
fs.writeFileSync('C:\\proyek\\kos-in\\src\\App.jsx', appJsxCode, 'utf8');
