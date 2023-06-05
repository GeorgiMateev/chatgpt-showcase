const conversationList = document.getElementById("conversation-list");
const codeContainer = document.getElementById("code-container");
const conversationContainer = document.getElementById("conversation-container");
const showConversationButton = document.getElementById("show-conversation");

// Add the list of conversations to the menu
const conversations = [
    { title: "Snake Game - May 2023 Model", url: "https://chat.openai.com/share/1fe7fc9f-cc4c-472b-b0a0-79e2adb8369c", code: "snake-june/index.html" },
    { title: "Snake Game - March 2023 Model", url: "https://chat.openai.com/share/1fe7fc9f-cc4c-472b-b0a0-79e2adb8369c", code: "snake.html" },
    { title: "Animations", url: "https://chat.openai.com/share/fb69553f-9143-4cf0-92cf-bbf911d96f5d", code: "cube.html" },
    { title: "Running horse", url: "https://chat.openai.com/share/1721d18d-efb5-46c9-93c2-81486dacf53a", code: "horse.html" },
    { title: "Calculator", url: "https://chat.openai.com/share/ed2006e9-36d7-475e-a0b5-687cbd013892", code: "calculator.html" },
    // Add more conversations as needed
];

conversations.forEach((conversation, index) => {
    const li = document.createElement("li");
    li.textContent = conversation.title;
    li.addEventListener("click", () => loadConversation(index));
    conversationList.appendChild(li);
});

function loadConversation(index) {
    const conversationIframe = document.getElementById("conversation-iframe");
    conversationIframe.src = conversations[index].url;

    // Load the code snippet
    const iframe = document.getElementById("code-container");
    iframe.src = `code_snippets/${conversations[index].code}`;

    // Show or hide the conversation when the button is clicked
    showConversationButton.onclick = () => {
        if (conversationContainer.style.display === "none") {
            conversationContainer.style.display = "block";
            // showConversationButton.textContent = "Hide Conversation";
        } else {
            conversationContainer.style.display = "none";
            showConversationButton.textContent = "Show Conversation";
        }
    };
}

loadConversation(0);


