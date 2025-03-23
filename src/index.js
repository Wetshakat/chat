document.addEventListener("DOMContentLoaded", () => {
    const contactsList = document.getElementById("contacts");
    const chatBox = document.getElementById("chat");
    const messageInput = document.getElementById("message");
    const sendButton = document.getElementById("btn");
    const messageArea = document.getElementById("messageArea");
    
   
    function loadContacts() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        contactsList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.fullName;
            li.classList.add("p-2", "bg-gray-100", "rounded", "cursor-pointer");
            li.addEventListener("click", () => openChat(user.fullName));
            contactsList.appendChild(li);
        });
    }
    
    
    function checkAuth() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            alert("You must be logged in to access chat.");
            window.location.href = "login.html";
        } else {
            document.getElementById("myInformation").textContent = ` ${currentUser.fullName}`;
        }
    }
    
    
    function openChat(userName) {
        messageArea.textContent = `Chat with ${userName}`;
        chatBox.innerHTML = "";
        localStorage.setItem("currentChat", userName);
        
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const chatKey = getChatKey(currentUser.fullName, userName);
        const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
        messages.forEach(msg => displayMessage(msg.text, msg.sender));
    }
    
   
    function getChatKey(user1, user2) {
        return [user1, user2].sort().join("-");
    }
    
    
    function displayMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        msgDiv.classList.add("p-3", "rounded-lg", "mb-2", "max-w-[70%]", "flex");
        
        if (sender === JSON.parse(localStorage.getItem("currentUser")).fullName) {
            msgDiv.classList.add("self-end", "bg-blue-500", "text-white", "justify-end");
        } else {
            msgDiv.classList.add("self-start", "bg-gray-300", "justify-start");
        }
        
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    
    sendButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        const recipient = localStorage.getItem("currentChat");
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (message && recipient && currentUser) {
            displayMessage(message, currentUser.fullName);
            
            const chatKey = getChatKey(currentUser.fullName, recipient);
            const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
            messages.push({ text: message, sender: currentUser.fullName });
            localStorage.setItem(chatKey, JSON.stringify(messages));
            
            messageInput.value = "";
        }
    });
    
    
    function logout() {
        localStorage.removeItem("currentUser");
        alert("Logged out successfully.");
        window.location.href = "login.html";
    }
    document.getElementById("logout").addEventListener("click", logout);
    
    
    checkAuth();
    loadContacts();
});
