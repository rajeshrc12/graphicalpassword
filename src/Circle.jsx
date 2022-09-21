import React, { useRef } from 'react'
import { FiRotateCcw, FiRotateCw } from 'react-icons/fi';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import Swal from 'sweetalert2';
const Circle = () => {
    let data = JSON.parse(sessionStorage.getItem("data"));
    const passRef = useRef();
    const circleSize = 250;
    const colors = ["#2e003e", "#2ab7ca", "#fed766", "#4f372d", "#f37736", "#7bc043", "#ff3377", "#ffdbac"];
    const userColor = data.color;
    let userPassword = data.password;
    const userPasswordCopy = userPassword;
    const infoMsg = `
    <div style="display: flex;align-items:center;justify-content:center">
        <div style="font-size: 30px;">
            <i class="bi bi-arrow-clockwise"></i>
        </div>
        <div>
            -rotates clockwise
        </div>
    </div>
    <div style="display: flex;align-items:center;justify-content:center">
        <div style="font-size: 30px;">
            <i class="bi bi-arrow-counterclockwise"></i>
        </div>
        <div>
            -rotates anti clockwise
        </div>
    </div>
    <div style="display: flex;align-items:center;justify-content:center">
        <div style="transform: rotate(180deg);">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="30" width="30"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m2 12 5 4v-3h9v-2H7V8z"></path>
                <path
                    d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z">
                </path>
            </svg>
        </div>
        <div>
            -select from outer circle
        </div>
    </div>

    <div style="display: flex;align-items:center;justify-content:center">
        <div style="transform: rotate(180deg);">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="30" width="30"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m10.998 16 5-4-5-4v3h-9v2h9z"></path>
                <path
                    d="M12.999 2.999a8.938 8.938 0 0 0-6.364 2.637L8.049 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051S20 10.13 20 12s-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637C21.063 16.665 22 14.405 22 12s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z">
                </path>
            </svg>
        </div>
        <div>
            -select from inner circle
        </div>
    </div> 
    <div style="display: flex;align-items:center;justify-content:center">
        <div style="font-size: 25px;">
        <i class="bi bi-info-circle"></i>
        </div>
        <div>
            -to see instruction again
        </div>
    </div>     
    `;
    while (userPassword.length < 16) {
        userPassword += randomLetter();
    }
    function randomLetter() {
        const characters = "!@#$%^&ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&abcdefghijklmnopa";
        return characters[Math.floor(Math.random() * 99)];
    }
    const shuffle = str => [...str].sort(() => Math.random() - 0.5);
    userPassword = shuffle(userPassword);
    const inCircle = userPassword.slice(0, 8);
    const outCircle = userPassword.slice(8, 16);

    function innerLetter() {
        passRef.current.value += inCircle[colors.indexOf(userColor)];
    }
    function outerLetter() {
        passRef.current.value += outCircle[colors.indexOf(userColor)];
    }
    function submitPassword() {
        if (passRef.current.value === userPasswordCopy) {
            Swal.fire({
                icon: 'success',
                title: 'Password Matched',
                text: ' Congrats'
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Password is not matching',
                text: ' Check your password'
            })
        }
    }
    function clearPassword() {
        if (passRef.current.value !== "")
            passRef.current.value = passRef.current.value.substring(0, passRef.current.value.length - 1);
    }
    const drawCircle = () => {
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        let i = 0, j = 0.25;
        ctx.lineWidth = 7;
        colors.forEach(c => {
            ctx.strokeStyle = c;
            ctx.beginPath();
            ctx.arc(circleSize / 2, circleSize / 2, circleSize / 2 - 3, i * Math.PI, j * Math.PI);
            ctx.stroke();
            i += 0.25;
            j += 0.25;
        });
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.fillStyle = "white";
        //==========first line ================
        const firstLineStartX = circleSize * 0.15,
            firstLineStartY = circleSize * 0.15,
            firstLineEndX = circleSize * 0.85,
            firstLineEndY = circleSize * 0.85;

        ctx.beginPath();
        ctx.moveTo(firstLineStartX, firstLineStartY);
        ctx.lineTo(firstLineEndX, firstLineEndY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(circleSize * 0.50, 0);
        ctx.lineTo(circleSize * 0.50, circleSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(circleSize * 0.15, circleSize * 0.85);
        ctx.lineTo(circleSize * 0.85, circleSize * 0.15);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, circleSize * 0.50);
        ctx.lineTo(circleSize, circleSize * 0.50);
        ctx.stroke();

        ctx.font = "normal 1.3rem Poppins";
        //=============inner circle=============
        ctx.fillText(inCircle[0], circleSize * 0.65, circleSize * 0.60);
        ctx.fillText(inCircle[1], circleSize * 0.55, circleSize * 0.70);
        ctx.fillText(inCircle[2], circleSize * 0.40, circleSize * 0.70);
        ctx.fillText(inCircle[3], circleSize * 0.30, circleSize * 0.60);
        ctx.fillText(inCircle[4], circleSize * 0.30, circleSize * 0.45);
        ctx.fillText(inCircle[5], circleSize * 0.40, circleSize * 0.35);
        ctx.fillText(inCircle[6], circleSize * 0.55, circleSize * 0.35);
        ctx.fillText(inCircle[7], circleSize * 0.65, circleSize * 0.45);

        //=============outer circle=============
        ctx.fillText(outCircle[0], firstLineEndX, firstLineEndY - circleSize * 0.15);
        ctx.fillText(outCircle[1], firstLineEndX - circleSize * 0.25, firstLineEndY);
        ctx.fillText(outCircle[2], firstLineEndX - circleSize * 0.55, firstLineEndY);
        ctx.fillText(outCircle[3], firstLineStartX - circleSize * 0.05, firstLineStartY + circleSize * 0.55);
        ctx.fillText(outCircle[4], firstLineStartX - circleSize * 0.05, firstLineStartY + circleSize * 0.25);
        ctx.fillText(outCircle[5], firstLineStartX + circleSize * 0.15, firstLineStartY);
        ctx.fillText(outCircle[6], firstLineStartX + circleSize * 0.50, firstLineStartY);
        ctx.fillText(outCircle[7], firstLineEndX, firstLineEndY - circleSize * 0.50);

    }
    React.useEffect(() => {
        drawCircle();
        Swal.fire({
            title: 'See how it works',
            icon: 'info',
            html: infoMsg
        })
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="container">
            <div className="card">
                <div className="title">Enter Password</div>
                <div>{data.email}</div>
                <div className='circle'>
                    <AiOutlineInfoCircle onClick={()=>Swal.fire({title: 'See how it works',icon: 'info',html: infoMsg})} size={20} style={{position:"absolute",right:"1rem",top:"0"}}/>
                    <canvas id="myCanvas" width={circleSize} height={circleSize}></canvas>
                </div>
                <div className="buttons">
                    <button className='flip' onClick={innerLetter}><BiLogInCircle size={30} /></button>
                    <button className='flip' onClick={outerLetter}><BiLogOutCircle size={30} /></button>
                    <button onClick={() => { colors.push(colors.shift()); drawCircle(); }}><FiRotateCcw size={30} /></button>
                    <button onClick={() => { colors.unshift(colors.pop()); drawCircle(); }}><FiRotateCw size={30} /></button>
                </div>
                <div className="input_wrapper">
                    <input ref={passRef} type="text" placeholder='Password' disabled />
                    <RiDeleteBack2Line onClick={clearPassword} className="icon" />
                </div>
                <div>
                    <button onClick={submitPassword}>SUBMIT</button>
                </div>
            </div>
        </div>
    )
}

export default Circle