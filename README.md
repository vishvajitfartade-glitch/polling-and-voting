# 🗳️ PollVote - Polling and Voting App

PollVote is a simple web-based polling and voting application built using HTML5, CSS3, Vanilla JavaScript and LocalStorage.

## 🚀 Features

- Create polls
- Add multiple options
- Vote on polls
- Prevent duplicate voting
- Live vote results
- Percentage-based progress bars
- Total vote counter
- Delete polls
- Multiple simultaneous polls
- Data stored using LocalStorage
- Responsive design

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- LocalStorage

## 📂 Project Structure

polling-voting-app/
│
├── index.html
├── style.css
├── script.js
└── README.md

## ▶️ How to Run

1. Download or clone the project.
2. Open the project folder.
3. Double-click `index.html`.
4. The application will open in your browser.

## 💾 Data Storage

Poll information is stored in the browser's LocalStorage.

Each poll contains:

- Poll ID
- Question
- Options
- Vote counts

Example:

{
    "id": 123456789,
    "question": "What is your favorite language?",
    "options": [
        {
            "text": "JavaScript",
            "votes": 5
        },
        {
            "text": "Python",
            "votes": 3
        }
    ]
}

## 🔐 Duplicate Vote Prevention

The application stores the IDs of polls that the user has already voted in.

LocalStorage key:

votedPolls

This prevents the same browser user from voting multiple times in the same poll.

## 📊 Percentage Calculation

Percentage is calculated using:

percentage = (optionVotes / totalVotes) * 100

The result is displayed as a progress bar.

## 🎯 Project Objective

This project demonstrates:

- JavaScript state management
- Objects and arrays
- DOM manipulation
- LocalStorage
- Dynamic UI updates
- Vote restriction logic
- Data visualization using percentage bars

## 👨‍💻 Author

Vishvajit

## 📜 License

This project is created for educational and internship purposes.
