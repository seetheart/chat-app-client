import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Messages = ({ messages, name, getMessages }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [file, setFile] = useState(null)

  const userData = JSON.parse(localStorage.getItem("user_data"));
  const token = userData?.token
  const id = userData?.user?.id

  const handleInput = (e) => {
    setInputMessage(e.target.value);
  };
  useEffect(() => {
    // getMessages();
  }, []);

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:3000/message",
        {
          content: inputMessage,
          chatroom: name,
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      )
      .then((res) => {
        getMessages(name);
        setInputMessage("");
      });
  };

  // const getMessages = async () => {
  //   axios
  //     .get(`http://localhost:3000/chatroom/${location.state.name}/messages`, {
  //       headers: { Authorization: `bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setMessages(res.data.messages);
  //     });
  // };

  const fileSelectHandler = (res) => {
    console.log('res', res.target.files[0])
    setFile(res.target.files[0])
  }

  const upload =()  =>{
    document.getElementById("selectImage").click()
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        borderRadius: "0 10px 10px 0",
        backgroundColor: "white",
        width: "700px",
        height: "90vh",
        
        position:'relative'
      }}
    >
      <div style={{ padding: "10px", overflow: "scroll", paddingBottom:'100px' }}>
        {messages?.map((item) => {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: id === item?.mes?.user_id ? "row-reverse":"row",
                  gap:1
                }}
              >
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "beige",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "100%",
                  }}
                >
                  {item.name.slice(0, 1)}
                </div>
                <div
                  style={{
                    padding: "2px 10px",
                    maxWidth: "50%",
                    border: "1px solid black",
                    borderRadius: "10px",
                    width: "fit-content",
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'flex-start'
                  }}
                >
                  <h5 style={{margin:0}}>{item?.name}</h5>
                  <p style={{textAlign: "left"}}>{item.mes.content}</p>
                </div>
              </div>
              <p style={{textAlign: id === item?.mes?.user_id ? "right" :'left', margin:'0 3rem 2rem 3rem'}}>{item.mes.created_at}</p>
            </>
          );
        })}
      </div>
      <div style={{position:'absolute', bottom:0, left:0, right:0, display:'flex', flexDirection:'column'}}>

      <input
        type="text"
        placeholder="Enter message"
        style={{ height: "50px" }}
        onChange={handleInput}
        value={inputMessage}
        />
        {/* <button id='plus' onClick={upload}>Select image</button> */}
         {/* <input id='selectImage' hidden type="file" onChange={fileSelectHandler} /> */}
      <button style={{  display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '59px',
    color: '#fff',
    background: '#4c00b4',
    // borderRadius: '50px',
    fontSize: '19px',
    fontWeight: 700,
    cursor: 'pointer'}} onClick={handleSubmit}>Send</button>
        </div>
    </div>
  );
};

export default Messages;
