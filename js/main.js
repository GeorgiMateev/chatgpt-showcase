const conversationList = document.getElementById("conversation-list");
const codeContainer = document.getElementById("code-container");
const conversationContainer = document.getElementById("conversation-container");
const showConversationButton = document.getElementById("show-conversation");

// Add the list of conversations to the menu
const conversations = [
    { title: "Snake Game", file: "snake.md", code: "snake.html" },
    { title: "Animations", file: "conversation2.md", code: "cube.html" },
    { title: "A horse", file: "conversation2.md", code: "horse.html" },
    { title: "Calculator", file: "conversation2.md", code: "calculator.html" },
    // Add more conversations as needed
];

conversations.forEach((conversation, index) => {
    const li = document.createElement("li");
    li.textContent = conversation.title;
    li.addEventListener("click", () => loadConversation(index));
    conversationList.appendChild(li);
});

function loadConversation(index) {
    // Load the conversation content
    fetch(`conversations/${conversations[index].file}`)
        .then((response) => response.text())
        .then((text) => {
            conversationContainer.innerHTML = marked.parse(text); // Convert Markdown to HTML using the marked library
            conversationContainer.style.display = "none"; // Hide the conversation initially
            showConversationButton.style.display = "block";
        });

    // Load the code snippet
    const iframe = document.getElementById("code-container");
    iframe.src = `code_snippets/${conversations[index].code}`;

    // Show or hide the conversation when the button is clicked
    showConversationButton.onclick = () => {
        if (conversationContainer.style.display === "none") {
            conversationContainer.style.display = "block";
            showConversationButton.textContent = "Hide Conversation";
        } else {
            conversationContainer.style.display = "none";
            showConversationButton.textContent = "Show Conversation";
        }
    };
}

loadConversation(0);


