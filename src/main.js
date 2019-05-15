// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
let vscode = {};
let raster;
let canvas;

window.onload = function() {
    vscode = acquireVsCodeApi();
    let data = _data;

    alert(data.description);

    // Get a reference to the canvas object
    canvas = document.getElementById('myCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);
    paper.install(window);
    // Create a Paper.js Path to draw a line into it:
    //var path = new paper.Path();
    //var square = new paper.Curve()
    // Give the stroke a color
    //path.strokeColor = 'black';
    //var start = new paper.Point(100, 100);
    // Move to start and draw a line from there
    //path.moveTo(start);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    //path.lineTo(start.add([ 200, -50 ]));
    
    let rasters = [];
    paper.view.viewSize = new paper.Size(1944.5, 2000);

    function resizeImg(img) {
        var width = paper.view.size.width; 
        var scale = (width / img.bounds.width) * 0.00075;
        img.scale(scale);
    }

    for (const item of data['workflow-item']) {
        
        rasters.push(new paper.Raster('scrip'));
        let curr = rasters[rasters.length - 1];
        curr.scale(0.25);
        // const pt = paper.view.projectToView(new paper.Point(item.position.x, item.position.y));
        curr.position.x = item.position.x;
        curr.position.y = item.position.y;
    }

    // paper.view.draw();
    
    // paper.view.zoom = 0.95;
    // paper.view.scale(0.25);
    
    // Draw the view now:
    //paper.view.draw();
        
    // Handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            default:
                console.log("test");
            break;
        }
    });
};

function sendMessage() {
    console.log(canvas.toDataURL());
    // vscode.postMessage({
    //     command: 'alert',
    //     text: 'alert from iframe'
    // });
}

