status="";
Objects=[];
function preload(){
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status:detecting objects";
}
function draw(){
    image(video,0,0,380,380);
    if (status !="") {
        r = random(255);
        
        g = random(255);

        b = random(255);

        objectdetector.detect(video,gotresult);
        for( i=0; i<Objects.length;i++){
            document.getElementById("status").innerHTML="status:object detected";
            fill(r,g,b);
            percent=floor(Objects[i].confidence*100);
            text(Objects[i].label +" "+ percent+"%",Objects[i].x+15,Objects[i].y +15);
            noFill();
            stroke(r,g,b);    
            rect(Objects[i].x,Objects[i].y,Objects[i].width,Objects[i].height);
        }
    }
}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
   
}
function gotresult(error,results){
if (error) {
    console.log(error);
}
else{
    console.log(results);
    Objects=results;
}
}