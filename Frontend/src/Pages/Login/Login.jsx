import React, { useState } from 'react'
import Instance from '../../Api/axios';
import Btn from '../../Components/Utilities/btn'

// Images
import logo from '../../assets/small-logo.png'

function Login() {
    const [isLogin, setLogin] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Field Updated: ${name}, Value: ${value}`);
        setLogin((prev) => ({
            ...prev,
            [name]: value,
        })) 
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('')

        try {
            const response = await Instance.post('/auth/login', isLogin)
            console.log('login successful:', response.data)

            const token = response.data.token

        }
        catch (e) {
            console.log('Login failed: ', e)
            setError('Invalid Credentials!')
        }
    }


  return (
    <div className='login relative flex justify-center items-center bg-building bg-no-repeat bg-cover w-screen h-screen min-h-screen'>
        <div className="blur-xl absolute top-0 left-0  bg-blue opacity-25 w-full h-full -z-0"></div>
        <img src={logo} alt=""  className='absolute top-10 left-10 w-12 h-12'/>
        <form onSubmit={handleLogin} className="login-box font-poppins p-11 bg-white flex flex-col gap-[24px] rounded-[10px] z-50">
            <h1 className='text-black font-semibold text-[96px]'>Bonjour</h1>
            <div className='flex flex-col'>
                <label htmlFor="" className=''>Nom d&apos;utilisateur</label>
                <input 
                    id="username"
                    name="username"
                    value={isLogin.username}
                    onChange={handleChange}
                    className='w-[533px] h-[46px] border-1 border-border rounded-[10px] px-2 outline-none focus:border-blue' 
                    type="text" 
                    placeholder='Entre votre nom d&#39;utilisateur...' />
                <p className='px-2'>Error</p>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">Mot de pass</label>
                <input 
                    id='password'
                    name='password'
                    value={isLogin.password}
                    onChange={handleChange}
                    type="password"
                    className='w-[533px] h-[46px] border-1 border-border rounded-[10px] px-2 outline-none focus:border-blue' 
                    placeholder='Entrer votre mot de passe...' />
                {error && <p className='px-2'>{error}</p>}
            </div>
            <div>
                <Btn content={'Connexion'} type={'submit'}/>
            </div>
        </form>
    </div>
  )
}

export default Login