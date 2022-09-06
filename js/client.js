const socket = io("http://localhost:8085");

//Get all DOM elements value 
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");

const messageContainer = document.querySelector(".container");


// append the message and position in "messagecontainer" div
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};



//Ask to user his/her name
const name1 = prompt("Enter your name to join");

// emit the  "new-user-joined" event and send it with name to backend- 
socket.emit("new-user-joined", name1);

//listen the name sent from backend and append the same to messageConatiner
socket.on("user-joined", (name) => {
    console.log("chalo chalte hai")
  append(   `${name} joined the chat`, "left");
});

//receive message from server
socket.on("receive", (data) => {
  //here data is the Object with message and user property
  append(`${data.name1} : ${data.message}`, "left");
});


//append the name when user left the chat and append to container
socket.on("left", (name) => {
  //here data is the Object with message and user property
  append(`${name} left the chat`, "left");
});


form.addEventListener("submit", function(e) {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value = "";
  });
  