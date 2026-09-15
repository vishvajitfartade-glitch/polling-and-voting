// ===============================
// Polling & Voting App
// ===============================

// Get elements
const pollQuestion = document.getElementById("pollQuestion");
const optionsContainer = document.getElementById("optionsContainer");
const addOptionBtn = document.getElementById("addOptionBtn");
const createPollBtn = document.getElementById("createPollBtn");
const pollsContainer = document.getElementById("pollsContainer");
const pollCount = document.getElementById("pollCount");
const message = document.getElementById("message");

// Load polls from LocalStorage
let polls = JSON.parse(localStorage.getItem("polls")) || [];

// Store voted poll IDs
let votedPolls = JSON.parse(localStorage.getItem("votedPolls")) || [];


// ===============================
// Save Data
// ===============================

function savePolls() {
    localStorage.setItem("polls", JSON.stringify(polls));
}

function saveVotedPolls() {
    localStorage.setItem("votedPolls", JSON.stringify(votedPolls));
}


// ===============================
// Add Option
// ===============================

addOptionBtn.addEventListener("click", () => {

    const optionInputs =
        document.querySelectorAll(".poll-option");

    if (optionInputs.length >= 6) {
        showMessage("Maximum 6 options allowed.", "red");
        return;
    }

    const input = document.createElement("input");

    input.type = "text";
    input.className = "poll-option";
    input.placeholder = `Option ${optionInputs.length + 1}`;

    optionsContainer.appendChild(input);
});


// ===============================
// Create Poll
// ===============================

createPollBtn.addEventListener("click", () => {

    const question = pollQuestion.value.trim();

    const optionInputs =
        document.querySelectorAll(".poll-option");

    const options = [];

    optionInputs.forEach(input => {

        const value = input.value.trim();

        if (value !== "") {
            options.push({
                text: value,
                votes: 0
            });
        }

    });

    // Validation

    if (question === "") {
        showMessage("Please enter a poll question.", "red");
        return;
    }

    if (options.length < 2) {
        showMessage("Please add at least 2 options.", "red");
        return;
    }

    // Create poll object

    const newPoll = {
        id: Date.now(),
        question: question,
        options: options
    };

    polls.push(newPoll);

    savePolls();

    // Clear form

    pollQuestion.value = "";

    optionsContainer.innerHTML = `
        <input
            type="text"
            class="poll-option"
            placeholder="Option 1"
        >

        <input
            type="text"
            class="poll-option"
            placeholder="Option 2"
        >
    `;

    showMessage("Poll created successfully!", "green");

    renderPolls();
});


// ===============================
// Render Polls
// ===============================

function renderPolls() {

    pollsContainer.innerHTML = "";

    pollCount.textContent =
        `${polls.length} ${polls.length === 1 ? "Poll" : "Polls"}`;

    if (polls.length === 0) {

        pollsContainer.innerHTML = `
            <div class="empty">
                <h3>📊 No polls yet</h3>
                <p>Create your first poll above.</p>
            </div>
        `;

        return;
    }

    polls.forEach(poll => {

        const card = document.createElement("div");

        card.className = "poll-card";

        const totalVotes =
            poll.options.reduce(
                (total, option) => total + option.votes,
                0
            );

        let optionsHTML = "";

        poll.options.forEach(option => {

            const percentage =
                totalVotes === 0
                    ? 0
                    : Math.round(
                        (option.votes / totalVotes) * 100
                    );

            optionsHTML += `
                <div class="option">

                    <div class="option-header">

                        <span class="option-name">
                            ${escapeHTML(option.text)}
                        </span>

                        <span class="percentage">
                            ${percentage}% (${option.votes})
                        </span>

                    </div>

                    <div class="progress">
                        <div
                            class="progress-bar"
                            style="width: ${percentage}%"
                        ></div>
                    </div>

                </div>
            `;
        });

        const alreadyVoted =
            votedPolls.includes(poll.id);

        let selectOptions = "";

        poll.options.forEach((option, index) => {

            selectOptions += `
                <option value="${index}">
                    ${escapeHTML(option.text)}
                </option>
            `;
        });

        card.innerHTML = `

            <h3>${escapeHTML(poll.question)}</h3>

            <div>
                ${optionsHTML}
            </div>

            <p>
                <strong>Total votes:</strong>
                ${totalVotes}
            </p>

            <div class="vote-area">

                <label>Select your answer:</label>

                <select
                    class="vote-select"
                    ${alreadyVoted ? "disabled" : ""}
                >
                    ${selectOptions}
                </select>

                <button
                    class="vote-btn"
                    ${alreadyVoted ? "disabled" : ""}
                >
                    ${alreadyVoted ? "✓ Already Voted" : "Vote"}
                </button>

                <br>

                <button class="delete-btn">
                    🗑 Delete Poll
                </button>

            </div>
        `;

        // Vote button

        const voteButton =
            card.querySelector(".vote-btn");

        const select =
            card.querySelector(".vote-select");

        if (!alreadyVoted) {

            voteButton.addEventListener("click", () => {

                const selectedIndex =
                    parseInt(select.value);

                poll.options[selectedIndex].votes++;

                votedPolls.push(poll.id);

                savePolls();
                saveVotedPolls();

                renderPolls();
            });
        }

        // Delete button

        const deleteButton =
            card.querySelector(".delete-btn");

        deleteButton.addEventListener("click", () => {

            const confirmDelete =
                confirm("Are you sure you want to delete this poll?");

            if (!confirmDelete) return;

            polls = polls.filter(
                item => item.id !== poll.id
            );

            votedPolls = votedPolls.filter(
                id => id !== poll.id
            );

            savePolls();
            saveVotedPolls();

            renderPolls();
        });

        pollsContainer.appendChild(card);
    });
}


// ===============================
// Message
// ===============================

function showMessage(text, color) {

    message.textContent = text;

    message.style.color = color;

    setTimeout(() => {
        message.textContent = "";
    }, 3000);
}


// ===============================
// Security Helper
// ===============================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ===============================
// Initial Render
// ===============================

renderPolls();