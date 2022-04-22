Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_qulity: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captureimage" src="' + data_uri + ' "/>';
    });
    console.log('ml5 verison:', ml5.virsion);
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/orEIOj0Ol/model.json ', modelLoaded);


    function modelLoaded() {
        console.log('model loaded!');
    }
}

function speak() {
    var synth = window.speechSynthis;
    speak_data1 = "The first prediction is " + prediction_1;
    speak_data2 = "And second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1, speak_data2);
    synth.speak(utterThis);
    utterThis.rate = 0.5;
}

function Check() {
    img = document.getElementById("captureimage");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_hand_sign").innerHTML = result[0].label;
        document.getElementById("result_hand_sign2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        if (results[0].label == "okay") { document.getElementById("update_hand").innerHTML = "&#128077;"; }
        if (results[0].label == "peace") { document.getElementById("update_hand").innerHTML = "&#128076;"; }
        if (results[0].label == "good") { document.getElementById("update_hand").innerHTML = "&#128545;"; }

        if (results[1].label == "okay") { document.getElementById("update_hand2").innerHTML = "&#128077;"; }
        if (results[1].label == "Peace") { document.getElementById("update_hand2").innerHTML = "&#128076;"; }
        if (results[1].label == "good") { document.getElementById("update_hand2").innerHTML = "&#9996;"; }

    }
}