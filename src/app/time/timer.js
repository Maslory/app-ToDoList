import React from 'react';
// import '../style/style.sass';
// import {compose} from 'react-apollo'

const compose = (...fns) =>
    (arg) =>
        fns.reduce(
            (composed, f) => f(composed),
            arg
        )



const oneSecond = () => 1000
const getCurrentTime = () => new Date()
const clear = () => console.clear()
const log = message => console.log(message)

const serializeClockTime = date =>
    ({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    })
const civilianHours = clockTime =>
    ({
        clockTime,
        hours: (clockTime.hours > 12) ?
            clockTime.hours - 12 :
            clockTime.hours
    })
const appendAMPM = clockTime =>
    ({
        clockTime,
        ampm: (clockTime.hours >= 12) ? "PM" : "AM"
    })

const display = target => time => target(time)
const formatClock = format =>
    time =>
        format.replace("hh", time.hours)
            .replace("mm", time.minutes)
            .replace("ss", time.seconds)
            .replace("tt", time.ampm)
const prependZero = key => clockTime =>
    ({
        clockTime,
        [key]: (clockTime[key] < 10) ?
            "0" + clockTime[key] :
            clockTime[key]
    })


const convertToCivilianTime = clockTime =>
    compose(
        appendAMPM,
        civilianHours
    )(clockTime)
const doubleDigits = civilianTime =>
    compose(
        prependZero("hours"),
        prependZero("minutes"),
        prependZero("seconds")
    )(civilianTime)
const startTicking = () =>
    setInterval(

        compose(
            clear,
            getCurrentTime,
            serializeClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    )




// function logClockTime() {
//     // Получение строки показания часов в гражданском формате
//     var time = getClockTime();
//     // Очистка показаний консоли и вывод показания часов
//     console.clear();
//     console.log(time);
// }
// function getClockTime() {
//     // Получение текущего времени
//     var date = new Date();
//     var time = "";
//     // Выстраивание последовательности показания часов
//     var time = {
//         hours: date.getHours(),
//         minutes: date.getMinutes(),
//         seconds: date.getSeconds(),
//         ampm: "AM"
//     }
//     // Преобразование показания времени в гражданский формат
//     if (time.hours == 12) {
//         time.ampm = "PM";
//     } else if (time.hours > 12) {
//         time.ampm = "PM";
//         time.hours -= 12;
//     }
//     // Подстановка 0 к показанию часов, чтобы получалась пара цифр
//     if (time.hours < 10) {
//         time.hours = "0" + time.hours;
//     }
//     // Подстановка 0 к показанию минут, чтобы получалась пара цифр
//     if (time.minutes < 10) {
//         time.minutes = "0" + time.minutes;
//     }
//     // Подстановка 0 к показанию секунд, чтобы получалась пара цифр
//     if (time.seconds < 10) {
//         time.seconds = "0" + time.seconds;
//     }
//     // Придание показаниям часов формата строки "hh:mm:ss tt"
//     return time.hours + ":"
//         + time.minutes + ":"
//         + time.seconds + " "
//         + time.ampm;
// }






export default startTicking