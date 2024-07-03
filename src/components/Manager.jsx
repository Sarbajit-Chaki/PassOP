import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const passRef = useRef()
    const [form, setForm] = useState({ url: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async() =>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])


    const showPass = (e) => {
        passRef.current.type = passRef.current.type == "password" ? "text" : "password"
        e.target.innerHTML = e.target.innerHTML === "visibility" ? "visibility_off" : "visibility";
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async() => {
        if (form.url.length > 3 && form.username.length > 3 && form.password.length > 3) {
        
            // If any such id exist in DB, Delete it
            if(form.id){
                await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type": "application/json" },
                    body: JSON.stringify({ id: form.id })})
            }
            
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])    
            await fetch("http://localhost:3000/",{method:"POST", headers:{"Content-Type": "application/json" },
                            body: JSON.stringify({ ...form, id: uuidv4() })})
            

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setForm({ url: "", username: "", password: "" })

            toast.success('Password Saved!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast.error('Error: Password not saved!');
        }
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const editPassword = async(id) => {
        setForm({...passwordArray.filter(item => item.id == id)[0], id: id})
        setPasswordArray(passwordArray.filter(item => item.id != id))
    }

    const deletePassword = async(id) => {
        let c = confirm("Do you want to delete the password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id != id))
            await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type": "application/json" },
                body: JSON.stringify({ id })})
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))

            toast.success('Password Deleted!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    return (
        <>
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className="main mb-10 max-sm:container max-sm:p-1 mx-auto mt-6 max-sm:mt-2 rounded-xl w-3/5  ">
                <h1 className="heading1 text-3xl font-bold mb-6 text-center ">
                    <span className=' text-green-600'>&lt;</span>Pass<span className=' text-green-600'>OP/&gt;; </span> <span className=' font-medium text-gray-400'>Your own Password Manager</span>
                </h1>

                <div className=' flex flex-col gap-y-4 items-center'>
                    <input value={form.url} onChange={handleChange} name='url' className="url w-full text-lg p-1 pr-8  rounded-sm border border-green-400" type="text" placeholder='Enter website URL' />
                    <div className=' flex justify-between w-full'>
                        <input value={form.username} onChange={handleChange} name='username' className="username text-lg p-1 pr-8  rounded-sm border border-green-400 max-sm:pr-0" type="text" placeholder='Enter Username' />
                        <div className="relative flex items-center">
                            <input ref={passRef} value={form.password} onChange={handleChange} name='password' className="password text-lg p-1 pr-8  rounded-sm border border-green-400 max-sm:pr-0" type="password" placeholder='Enter Password' />
                            <span onClick={showPass} className=" absolute right-0  cursor-pointer material-symbols-outlined">visibility_off</span>
                        </div>
                    </div>


                    <button onClick={savePassword} className=' flex justify-center items-center bg-green-500 hover:bg-green-400 w-fit rounded-full px-2 py-1 border-2 border-green-600'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        <span className=' pl-1'>Save</span>
                    </button>
                </div>

                <div>
                    <h2 className="heading2 text-2xl font-bold mt-4 mb-2">Your Passwords</h2>
                    {passwordArray.length == 0 && <div className=' text-red-600'>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-lg overflow-hidden">
                            <thead className=' bg-green-700 text-white '>
                                <tr>
                                    <th className=' py-2 '>Site</th>
                                    <th className=' py-2 '>Username</th>
                                    <th className=' py-2 '>Password</th>
                                    <th className=' py-2 '>Actions</th>
                                </tr>
                            </thead>
                            <tbody className=' bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=' text-center py-1 border border-white cursor-pointer'>
                                            <a href={`http://${item.url}`} target='_blank'>{item.url}</a>
                                            <lord-icon onClick={() => { copyText(item.url) }}
                                                style={{ "width": "25px", "height": "25px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </td>
                                        <td className=' text-center py-1 border border-white cursor-pointer'>{item.username}
                                            <lord-icon onClick={() => { copyText(item.username) }}
                                                style={{ "width": "25px", "height": "25px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </td>
                                        <td className=' text-center py-1 border border-white cursor-pointer'>*****
                                            <lord-icon onClick={() => { copyText(item.password) }}
                                                style={{ "width": "25px", "height": "25px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </td>
                                        <td className=' text-center py-1 border border-white cursor-pointer'>
                                            <span onClick={() => { editPassword(item.id) }} className=' cursor-pointer mx-2 max-sm:mx-1'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span onClick={() => { deletePassword(item.id) }} className=' cursor-pointer mx-2 max-sm:mx-1'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager