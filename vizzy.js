$(document).ready(function(){
    $('#upload-form').submit(function(event){
        event.preventDefault(); // Prevent default form submission
        
        // Handle file uploads using JavaScript
        var formData = new FormData(this);
        
        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response){
                alert(response); // Display success message or handle response
            },
            error: function(xhr, status, error){
                console.error(error); // Handle errors
            }
        });
    });
});

// JavaScript for audio visualization
var audioElement = document.getElementById('audio-element');
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

var analyser = audioContext.createAnalyser();
var canvas = document.getElementById('visualizer-canvas');
var canvasCtx = canvas.getContext('2d');

function visualize() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    var barWidth = (canvas.width / bufferLength) * 2.5;
    var barHeight;
    var x = 0;
    for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
        x += barWidth + 1;
    }

    requestAnimationFrame(visualize);
}

// Call the visualize function to start visualization
visualize();

// Function to handle audio file input change
document.getElementById('audio-input').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var objectURL = URL.createObjectURL(file);
    audioElement.src = objectURL;
});
