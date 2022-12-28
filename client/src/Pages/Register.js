import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate=useNavigate();

  const [name,setName]=useState('');
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  async function registerUser(event){
    event.preventDefault()
    const response= await fetch('http://localhost:1337/api/register',{
      method:'POST',
      headers:{
         'Content-Type':'application/json',
      },
      body:JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data=await response.json()

    if(data.status==='ok'){
      navigate('/login')
    }
    console.log(data)
  }

  return <div>
    <h1>Register</h1>
    <form onSubmit={registerUser}>
      <input type='name' onChange={(e)=>setName(e.target.value)} placeholder="username" value={name}/><br/>
      <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder="email" value={email}/><br/>
      <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder="password" value={password}/><br/>
      <input type="submit" value="Register"/>
    </form>
  </div>
    
}

export default App;
