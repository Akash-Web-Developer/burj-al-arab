import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext, userContext } from '../../App'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [selectedDate, setSelectedDate] = useState({
        CheckIn: new Date(),
        CheckOut: new Date()
    });

    const handleCheckInDate = (date) => {
        const newDates = {...selectedDate};
        newDates.CheckIn =  date;
        setSelectedDate(newDates);
    };

    const handleCheckOutDate = (date) => {
        const newDates = {...selectedDate};
        newDates.CheckOut = date;
        setSelectedDate(newDates);
    }

    const handleBooking = () =>{
        const newBooking = {...loggedInUser, ...selectedDate};
        fetch('http://localhost:5000/addBooking', {
            method: 'POST',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hello {loggedInUser.name}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>


            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In Date"
                        value={selectedDate.CheckIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Date"
                        format="MM/dd/yyyy"
                        value={selectedDate.CheckOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>

            <Button onClick={handleBooking} variant="contained" color="primary">Book Now</Button>

            <Bookings></Bookings>
        </div>


    );
};

export default Book;