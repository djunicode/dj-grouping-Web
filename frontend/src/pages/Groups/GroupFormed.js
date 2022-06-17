import { Button, Card, Grid, Paper } from '@mui/material'
import React from 'react'
import './GroupFormed.scss'
import { GroupFormedAction } from "../../REDUX/Actions/GroupFormedAction"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

const GroupFormed = () => {

    const dispatch = useDispatch();
    const GroupFormed = useSelector((state) => state.GroupFormed);

    const { loading, error, GroupFormedData } = GroupFormed;
    useEffect(() => {
        dispatch(GroupFormedAction());
    }, [dispatch]);
     console.log('====================================');
     console.log(GroupFormedData);
     console.log('====================================');
    return (
        <div>
            <h1 className='groupHeading'>Groups Formed</h1>

            <Grid spacing={{ xs: 2, md: 3 }} container className='GroupMain'>
                <Grid item xs={12} sm={6} md={3} className='innerGroupGrid'>
                    <Card >
                        <img src='https://picsum.photos/400/300' alt='random'></img>
                    </Card>
                    <p>GROUP A</p>
                    <Button variant='contained' color='success' className='groupButton'>Join</Button>
                    <br />
                    <Button variant='contained' color='error' className='groupButton'>Decline</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className='innerGroupGrid'>
                    <Card >
                        <img src='https://picsum.photos/400/300' alt='random'></img>
                    </Card>
                    <p>GROUP A</p>
                    <Button variant='contained' color='success' className='groupButton'>Join</Button>
                    <br />
                    <Button variant='contained' color='error' className='groupButton'>Decline</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className='innerGroupGrid'>
                    <Card >
                        <img src='https://picsum.photos/400/300' alt='random'></img>
                    </Card>
                    <p>GROUP A</p>
                    <Button variant='contained' color='success' className='groupButton'>Join</Button>
                    <br />
                    <Button variant='contained' color='error' className='groupButton'>Decline</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className='innerGroupGrid'>
                    <Card >
                        <img src='https://picsum.photos/400/300' alt='random'></img>
                    </Card>
                    <p>GROUP A</p>
                    <Button variant='contained' color='success' className='groupButton'>Join</Button>
                    <br />
                    <Button variant='contained' color='error' className='groupButton'>Decline</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className='innerGroupGrid'>
                    <Card >
                        <img src='https://picsum.photos/400/300' alt='random'></img>
                    </Card>
                    <p>GROUP A</p>
                    <Button variant='contained' color='success' className='groupButton'>Join</Button>
                    <br />
                    <Button variant='contained' color='error' className='groupButton'>Decline</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3} className='innerGroupGrid'>
                    <Card >
                        <img src='https://picsum.photos/400/300' alt='random'></img>
                    </Card>
                    <p>GROUP A</p>
                    <Button variant='contained' color='success' className='groupButton'>Join</Button>
                    <br />
                    <Button variant='contained' color='error' className='groupButton'>Decline</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default GroupFormed