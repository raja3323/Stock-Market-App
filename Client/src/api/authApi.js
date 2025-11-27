// cookie mein token ko backend se bhejna aur yeh sab cheezo mein confusiion hai merko

import axios from 'axios';

export function signup({name, email, password}){
   const data = axios.post('http://localhost:4444/api/auth/signup',{
      
   })
}