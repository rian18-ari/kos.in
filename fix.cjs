const fs = require('fs');

let content = fs.readFileSync('c:/proyek/kos-in/src/App.jsx', 'utf8');

// 1. Replace class= with className=
content = content.replace(/class=/g, 'className=');

// 2. Replace <!-- --> with {/* */}
content = content.replace(/<!--(.*?)-->/gs, '{/*$1*/}');

// 3. Replace for= with htmlFor=
content = content.replace(/for=/g, 'htmlFor=');

// 4. Replace onclick="selectRoom('X')" with onClick={() => window.selectRoom('X')}
content = content.replace(/onclick="selectRoom\('(.*?)'\)"/g, 'onClick={() => window.selectRoom(\'$1\')}');

// 5. Replace onclick="switchDetailTab('X')" with onClick={() => window.switchDetailTab('X')}
content = content.replace(/onclick="switchDetailTab\('(.*?)'\)"/g, 'onClick={() => window.switchDetailTab(\'$1\')}');

// 6. Extract the script content and put it in a useEffect inside App()
const scriptRegex = /<script>(.*?)<\/script>/s;
const match = content.match(scriptRegex);

if (match) {
    let scriptContent = match[1];
    
    // We need to attach selectRoom and switchDetailTab to window so they are accessible from onClick
    scriptContent = scriptContent.replace('function switchDetailTab(tab)', 'window.switchDetailTab = function(tab)');
    scriptContent = scriptContent.replace('function selectRoom(roomId)', 'window.selectRoom = function(roomId)');

    const useEffectBlock = `
  useEffect(() => {
    ${scriptContent}
  }, []);
`;
    // Remove the script tag from JSX
    content = content.replace(scriptRegex, '');
    
    // Insert the useEffect inside the App component, right before return (
    content = content.replace('function App() {', 'function App() {' + useEffectBlock);
}

// 7. Make sure useEffect is imported
if (!content.includes('useEffect')) {
    content = content.replace("import { useState }", "import { useState, useEffect }");
}

fs.writeFileSync('c:/proyek/kos-in/src/App.jsx', content);
console.log('App.jsx has been fixed!');
