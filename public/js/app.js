
console.log('Client side javascript file is loaded!')

function readText (form) {
    TestVar =form.inputbox.value;
    fetch('http://localhost:3000/weather?city='+TestVar).then(response=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById('para1').innerHTML=data.error;
        }else{
            console.log(data)
            document.getElementById('para1').innerHTML = 'City is '+data.weather.city;
            document.getElementById('para2').innerHTML = 'Temperature is '+data.weather.temperature;
        }
        

    })
})
    
}

