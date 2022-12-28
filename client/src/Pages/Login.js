import {useState} from 'react';


function App() {

  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  async function loginUser(event){
    event.preventDefault()
    const response= await fetch('http://localhost:1337/api/login',{
      method:'POST',
      headers:{
         'Content-Type':'application/json',
      },
      body:JSON.stringify({
        email,
        password,
      }),
    })

    const data=await response.json()
    if(data.user){
      localStorage.setItem('token',data.user)
      alert('Login Successful')
      window.location.href='/dashboard'
    }else{
      alert('Wrong email or password')
    }
    console.log(data)
  }

  return <div>
    <h1>Login</h1>
    <form onSubmit={loginUser}>
     
      <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder="email" value={email}/><br/>
      <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder="password" value={password}/><br/>
      <input type="submit" value="Login"/>
    </form>
  </div>
    
}

export default App;
