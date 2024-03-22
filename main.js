// Check environment
if (process.env.NODE_ENV === 'development') {
    // Development mode, load files directly
    const scriptElement = document.createElement('script');
    const linkElement = document.createElement('link');

    scriptElement.src = '/assets/src/js/app.js';
    scriptElement.type = 'module';

    linkElement.href = '/assets/src/css/app.scss';
    linkElement.rel = 'stylesheet';

    document.body.appendChild(scriptElement);
    document.head.appendChild(linkElement);
}
else {
    // Production mode, fetch the manifest.json
    fetch('/assets/dist/.vite/manifest.json')
        .then(response => response.json())
        .then(data => {
            // Get the filename of the CSS file from the manifest and append it to the head tag.
            const appCSSFile = data['assets/src/css/app.scss'].file;
            const linkElement = document.createElement('link');
            linkElement.setAttribute('rel', 'stylesheet');
            linkElement.setAttribute('href', './assets/dist/' + appCSSFile);
            document.head.appendChild(linkElement);

            // Get the filename of the JS file from the manifest and append it to the body tag.
            const appJSFile = data['assets/src/js/app.js'].file;
            const scriptElement = document.createElement('script');
            scriptElement.setAttribute('src', './assets/dist/' + appJSFile);
            document.body.appendChild(scriptElement);
        });
}