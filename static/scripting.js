let time = document.getElementsByClassName('time')[0];
const finalResult = ()=>{
    const date = new Date();
    const day = ()=>{
        const arr =  ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
        const days = arr[date.getDay()];
        return days;
    }

    const month = ()=>{
        const arr = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const month = arr[date.getMonth()];
        const dates = date.getDate();
        return month+" "+dates;
    }

    const timing = ()=>{
        const local = date.toLocaleTimeString();
        return local;
    }
    
    time.innerHTML = `${day()} | ${month()} | ${timing()}`
}

setInterval(finalResult, 1);