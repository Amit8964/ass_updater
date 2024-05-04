import "./Main.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useState } from "react";
import React, { useEffect } from 'react';





const Main = ()=>{


    const [data, setData] = useState({
        id:"",
        heading:"",
        content:""
    
    })

    const [counter, setCounter] = useState(0);




useEffect(()=>{

    axios.get("https://ass-backend.onrender.com/get_content").then((resp)=>{

        console.log(resp)
        if(resp.status == 200){
      setData((prev)=>{

return{
    id:resp.data._id,
    heading:resp.data.heading,
    content:resp.data.content
}
  })
  console.log(data)     
        }


    })


},[])


 



    const handleInput = (e)=>{
setData((prev)=>{
    return{
        ...prev,
        [e.target.name]:e.target.value
    }
})
 }


 const handleAdd = ()=>{

axios.post("https://ass-backend.onrender.com/add_content", {heading:data.heading, content:data.content}).then((resp)=>{
    console.log(resp)
if(resp.status==200){
    toast.success(' Task added successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
       
        })
        
}
else{

    toast.error(' Somthing Went Wrong ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",      
        }) 
}

})

 }




const handleUpdate = ()=>{

    axios.post(`https://ass-backend.onrender.com/update_content/${data.id}`, {heading:data.heading, content:data.content}).then((resp)=>{

if(resp.status ==200){

    toast.success(' Task updated successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
       
        })
setCounter(counter+1)
}
else{
    toast.error(' Somthing Went Wrong ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",      
        }) 
}


})


    
}





    return <>

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
style={{fontSize:"1.8rem", width:"40rem", padding:"0 2rem"}}
/>

<div className="header">

<h1>Welcom admin !</h1>

</div>

<div className="counterShow"><h1>record updated {counter} times</h1></div>

<div className="container">

<div className="containerBox">

<input type="text" name="heading" placeholder="Enter Heading" className="headingInput input" onChange={handleInput} value={data.heading}/>
<input type="text" name="content" placeholder="Enter Content " className="contentInput input" onChange={handleInput} value={data.content} />

<div className="buttonBox">
    <button className="btn" onClick={handleAdd} >Add Data</button>
    <button className="btn" onClick={handleUpdate}>Update Data</button>
</div>

</div>



</div>

    
    </>
}

export default Main;