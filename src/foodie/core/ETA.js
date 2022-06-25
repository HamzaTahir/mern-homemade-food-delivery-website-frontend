import React,{useEffect, useState} from 'react';
import Layout from './Layout';
import {checkETA} from '../core/apiFoodie';
import {isAuthenticated} from '../auth/index';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";
// Call it once in your app. At the root of your app is the best place
toast.configure()


const ETA = () =>{
    const [values, setValues] = useState({
        orderId:'5fdf4fa32025ec3e3cdc349f',
        error:false,
        success:false,
        eta: 0,
        errorText:''
    }); 
    const {orderId, error, success, eta, errorText} = values
    const {token} = isAuthenticated()
    const {user:{_id}}  = isAuthenticated();
    const checkETAButton = () =>{
        checkETA(orderId, token, _id)
        .then(data =>{
            if(data.error){
                setValues({...values, error: true, errorText:data.error})
                toast.error(data.error);
            }
            else{
                if(data === 'Order is Shipped'){
                    toast.success(data);
                    if(eta === 0){
                        var time = Math.floor(Math.random() * 21) + 5;
                    }
                    else{
                        time = eta
                    }
                    // var etaTime = `Your Rider is ${time} minutes Away`
                    setValues({...values, success: true, eta: time})
                }
                else{
                    setValues({...values, success: true})
                    toast.success(data);
                }
            }   
        })
    }
    const handleChange = name => (e) =>{
        setValues({...values, error: false, [name]: e.target.value})
    }
    const etaCheckFunction = () =>{
        if(eta != 0){
            return(
                <div>
                    <p style={{widows:'100%', fontSize:20, textAlign:'center'}}>Your Rider is {eta} minutes Away</p>
                    {/* <br/> */}
                    <p style={{width:'100%', textAlign:'center'}}>
                        <img src="../..//driver.gif" style={{width:'150px', height:'100px'}}/>
                    </p>
                </div>
            )
        }
        // if(eta===''){
        //     return
        // }
        // else{
        //     const minuteSeconds = 60;
        //     const hourSeconds = 3600;
        //     const daySeconds = 86400;

        //     const timerProps = {
        //     isPlaying: true,
        //     size: 120,
        //     strokeWidth: 6
        //     };

        //     const renderTime = (dimension, time) => {
        //     return (
        //         <div className="time-wrapper">
        //         <div className="time">{time}</div>
        //         <div>{dimension}</div>
        //         </div>
        //     );
        //     };

        //     const getTimeSeconds = time => (minuteSeconds - time / 1000) | 0;
        //     const getTimeMinutes = time => ((time % hourSeconds) / minuteSeconds) | 0;
        //     const getTimeHours = time => ((time % daySeconds) / hourSeconds) | 0;
        //     const getTimeDays = time => (time / daySeconds) | 0;

        //     const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
        //     const endTime = stratTime + 243248; // use UNIX timestamp in seconds

        //     const remainingTime = endTime - stratTime;
        //     const days = Math.ceil(remainingTime / daySeconds);
        //     const daysDuration = days * daySeconds;

        //     return (
        //         <div className="App">
        //         <CountdownCircleTimer
        //             {...timerProps}
        //             colors={[["#7E2E84"]]}
        //             duration={daysDuration}
        //             initialRemainingTime={remainingTime}
        //         >
        //             {({ elapsedTime }) =>
        //             renderTime("days", getTimeDays(daysDuration - elapsedTime / 1000))
        //             }
        //         </CountdownCircleTimer>
        //         <CountdownCircleTimer
        //             {...timerProps}
        //             colors={[["#D14081"]]}
        //             duration={daySeconds}
        //             initialRemainingTime={remainingTime % daySeconds}
        //             onComplete={totalElapsedTime => [
        //             remainingTime - totalElapsedTime > hourSeconds
        //             ]}
        //         >
        //             {({ elapsedTime }) =>
        //             renderTime("hours", getTimeHours(daySeconds - elapsedTime / 1000))
        //             }
        //         </CountdownCircleTimer>
        //         <CountdownCircleTimer
        //             {...timerProps}
        //             colors={[["#EF798A"]]}
        //             duration={hourSeconds}
        //             initialRemainingTime={remainingTime % hourSeconds}
        //             onComplete={totalElapsedTime => [
        //             remainingTime - totalElapsedTime > minuteSeconds
        //             ]}
        //         >
        //             {({ elapsedTime }) =>
        //             renderTime(
        //                 "minutes",
        //                 getTimeMinutes(hourSeconds - elapsedTime / 1000)
        //             )
        //             }
        //         </CountdownCircleTimer>
        //         <CountdownCircleTimer
        //             {...timerProps}
        //             colors={[["#218380"]]}
        //             duration={minuteSeconds}
        //             initialRemainingTime={remainingTime % minuteSeconds}
        //             onComplete={totalElapsedTime => [remainingTime - totalElapsedTime > 0]}
        //         >
        //             {({ elapsedTime }) =>
        //             renderTime("seconds", getTimeSeconds(elapsedTime))
        //             }
        //         </CountdownCircleTimer>
        //         </div>
        //     );
        // }
    }
    const showError = () =>{
        if(error){
            return(
                <div className="alert alert-danger">
                    <h2>{errorText}</h2>
                </div>
            )
        }
    }
    return(
        <div>
            <Layout/>
               <div className="container col-md-8" style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}> 
                    {/* {showError()} */}
                    <p style={{fontSize:27, fontWeight:600, textAlign:"center"}}>KHANSAMA Order Status</p>
                    <div className='form-group'>
                    <label className="text-muted">Enter Order Id</label>
                        <input type='text' onChange={handleChange('orderId')} className='form-control' value={orderId}/>
                    </div>
                    <button className='btn btn-primary' onClick={checkETAButton}>Check Status</button>
                    <br/>
                    <hr/>
                    {etaCheckFunction()}
                </div>
        </div>
    );
};

export default ETA;
