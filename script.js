const FULL_DASH_ARRAY = 283;

//initial color for remaining time path
const COLOR_CODES = {
    info: {
        color: "green"
    }
};

//start with an initial value of 20 seconds
const TIME_LIMIT = 600;
let timePassed = 0;
//counting down
let timerInterval = null;
let timeLeft = TIME_LIMIT;
let remainingPathColor = COLOR_CODES.info.color;


//template, svg for timer ring
document.getElementById('app').innerHTML = `
    <div class='base-timer'>
        <svg class='base-timer__svg' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
            <g class='base-timer__circle'>
                <circle class='base-timer__path-elapsed' cx='50' cy='50' r='45'> </circle>
                <path
                    id='base-timer-path-remaining'
                    stroke-dasharray='283'
                    class='base-timer__path-remaining ${remainingPathColor}'
                    d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                    "
                ></path>
            </g>
        </svg>
        <span id='base-timer-label' class='base-timer__label'>
            <!-- remaining time label -->
            ${formatTimeLeft(timeLeft)}
        </span>
    </div>
`;

startTimer();

function timesUp() {
    clearInterval(timerInterval);
}

//time label
function formatTimeLeft(time) {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    //if the value of seconds is less than 10, display with a leading zero
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    //output is in MM:SS format
    return `${minutes}:${seconds}`;
}

//divides time left by the defined time limit
function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);

}

//update the dasharray value as time passes, starting with 283
function setCircleDasharray(){
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById('base-timer-path-remaining')
        .setAttribute('stroke-dasharray', circleDasharray);
}

function startTimer() {
    timerInterval = setInterval(() => {
        //amount of time passed incrememnts by one
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;

        //time left label is updated
        document.getElementById('base-timer-label').innerHTML = formatTimeLeft(timeLeft);

        setCircleDasharray();

        if (timeLeft === 0){
            timesUp();
        }

    }, 1000);
}

//*random background
let ran = Math.floor(Math.random() * 10);
document.body.style.backgroundImage = `url('images/background-${ran}.jpg')`;
console.log(ran);
