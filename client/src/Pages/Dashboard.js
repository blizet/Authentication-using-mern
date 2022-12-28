import React,{useEffect, useState} from 'react';
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

const Dashboard=()=>{
    const navigate = useNavigate()
    const [quote,setQuote]= useState('');
    const [tempQuote,setTempQuote]= useState('');
    
    async function populateQuote(){
         const req=await fetch('http://localhost:1337/api/quote',{
            headers:{
                'x-access-token':localStorage.getItem('token'),
             }
         },
        )

        const data=await req.json()
        if(data.status==='ok'){
            setQuote(data.quote)
        }else{
            alert(data.error)
        }
    }

    async function updateQuote(event){
        event.preventDefault();
        const req=await fetch('http://localhost:1337/api/quote',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token':localStorage.getItem('token'),
             },
             body: JSON.stringify({
                quote:tempQuote,
            })
         })

        const data=await req.json()
        if(data.status==='ok'){
            setQuote(tempQuote)
            setTempQuote('')
            
        }else{
            alert(data.error)
        }
    }

    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){
            const user=jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login',{replace:true})            
            }else{
                populateQuote();
            }
        }
    },[])
    
    return <div>
        <h1>Your Quote: {quote || 'Try on the Quote you love bu default!!'}</h1>
        <form onSubmit={updateQuote}>
            <input type='text' placeholder='Enter another Quote' value={tempQuote} onChange={e=>setTempQuote(e.target.value)}/><br/>
            <input type='submit' value='Update Quote'/>
        </form>
    </div>
}

export default Dashboard;