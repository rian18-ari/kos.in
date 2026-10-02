import re

with open(r'C:\Users\ari_chii\.gemini\antigravity-ide\brain\34964797-c669-4e8c-8ae1-16d1c8a4899c\scratch\screen2.html', 'r', encoding='utf-16le') as f:
    html = f.read()

# Fix classes, for, etc.
html = html.replace('class=', 'className=')
html = html.replace('for=', 'htmlFor=')
html = html.replace('tabindex=', 'tabIndex=')
html = html.replace('<!--', '{/*')
html = html.replace('-->', '*/}')

# Find body if any, or just use the whole thing if it's a fragment
if '<body' in html:
    # try to extract body
    start = html.find('<body')
    end = html.find('</body>')
    if end == -1: end = len(html)
    body_content = html[start:end]
    # find the first > of <body ...>
    first_gt = body_content.find('>')
    body_content = body_content[first_gt+1:]
else:
    body_content = html

# Remove scripts
body_content = re.sub(r'<script.*?</script>', '', body_content, flags=re.DOTALL)

# Self close tags for JSX
body_content = re.sub(r'<(img|input|br|hr)([^>]*[^/])>', r'<\1\2 />', body_content)
# some img tags might already end in '/>' or ' />' so the above regex [^/] might miss some edge cases but since it's ([^>]*[^/])>, if it ends in / it won't match, which is perfect!

jsx = f'''import './App.css';

function App() {{
  return (
    <>
      {{body_content}}
    </>
  );
}}

export default App;
'''

# fix formatting
jsx = jsx.replace('{{', '{').replace('}}', '}').replace('{/*', '/*').replace('*/}', '*/')
jsx = jsx.replace('/*', '{/*').replace('*/', '*/}')

# Convert styles inline if any
jsx = re.sub(r'style="([^"]*)"', lambda m: 'style={{' + ', '.join([f"'{k.strip()}': '{v.strip()}'" for k, v in [x.split(':') for x in m.group(1).split(';') if ':' in x]]) + '}}', jsx)


with open(r'C:\proyek\kos-in\src\App.jsx', 'w', encoding='utf-8') as f:
    f.write(jsx)
