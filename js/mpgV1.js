"use strict"
function calcMPG(){
    let m = document.getElementById("miles").value;
    let g = document.getElementById("gallons").value;

    let resultsDiv = document.getElementById("results");
    let oStr = processThisValue( m, g, resultsDiv );
    resultsDiv.innerHTML = oStr;

}
function processThisValue( miles, gals, resultsDiv ) {
    let msg;
    gals = parseFloat( gals );
    miles = parseFloat( miles );
    let oStr = "";
    const low_miles = 15;
    const high_miles = 25;

    if ( isNaN(gals) || isNaN(miles) ) {
        oStr = `<span style=color:red> miles or gals is not a number </span>`;
    } else if ( gals <= 0  || miles <= 0 ) {
        oStr = `<span style=color:red> Mile LT 0</span>`;
    } else {
        let  mpg = (miles / gals).toFixed(2);

        if(mpg > high_miles){
            //make text green
            oStr = `<span style="color:green">MPG:${mpg}</span>`;
        } else if(mpg > low_miles && mpg < high_miles){

            resultsDiv.style.color = "magenta";
            oStr = `MPG:${mpg}`;

        } else if(mpg < low_miles){
                oStr = `<span style="color:red">MPG:${mpg}</span>`;
        }else {
            resultsDiv.style.color = "black"; // default
            oStr = `MPG:${mpg}`;
        }
    }

    return oStr;
}