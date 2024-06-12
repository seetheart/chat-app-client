import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Messages from "./Messages";

const Chat = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([])
  const [selectedName, setSelectedName] = useState(null)
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("user_data"))?.token;
   
  useEffect(() => {

    if(!token){
      navigate('/signin');
      return;
    }

 axios
      .get("http://localhost:3000/chatroom", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((res) => {
        setChatrooms(res.data.chatrooms);
      });
  }, []);

  const getMessages = async (name) => {
    axios
      .get(`http://localhost:3000/chatroom/${name}/messages`, {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setMessages(res.data.messages);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width:'100vw',
        height:'100vh',
        backgroundColor:'white',
        justifyContent:"center",
        alignItems:'center '
      }}
    >
      <div style={{
        display: "flex",
        flexDirection: "row",
      }}>  
              <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          borderRadius: "10px 0 0 10px",
          backgroundColor: "white",
          width: "300px",
        }}
      >
        {chatrooms.map((item) => {
          return (
            <>
              <div
                style={{backgroundColor: selectedName === item?.name ? 'grey':'white' , borderBottom:'1px solid black', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 2rem' }}
                onClick={() => {
                  getMessages(item?.name)
                  setSelectedName(item?.name)
                }}
              > 
              <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                <div style={{width:'4rem', height:'4rem', borderRadius:'100%', backgroundColor:"burlywood", marginRight:'5px', display:'flex', justifyContent:'center', alignItems:'center'}}>{item.name.slice(0,1)}</div>
                <h3>{item.name}</h3>
              </div>
                <h1>{'>'}</h1>
              </div>
            </>
          );
        })}
      </div>
      <Messages messages={messages} getMessages={getMessages} name={selectedName}/>
    
    </div>
    </div>

  );
};

export default Chat;
