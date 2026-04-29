# Real-Time Collaboration Tool

## Overview
This project is a real-time collaboration tool that allows multiple users to edit content simultaneously. Any changes made by one user are instantly reflected for all other users without refreshing the page.

## Tech Stack
Frontend: React.js  
Backend: Node.js with Express  
Real-time Communication: Socket.io (WebSockets)

## Features
- Real-time text synchronization
- Multi-user collaboration
- Instant updates without page reload
- Simple and clean interface

## Project Structure
client/ - React frontend  
server/ - Node.js backend  

## Installation and Setup

1. Clone the repository
git clone https://github.com/Rohan-jukti/real-time-collaboration-tool.git
cd real-time-collaboration-tool

2. Install dependencies

Server:
cd server
npm install

Client:
cd ../client
npm install

3. Run the project

Start server:
cd server
node index.js

Start client:
cd client
npm start

## Usage
- Open the application in your browser
- Open the same URL in multiple tabs
- Start typing in one tab
- The text will update in real-time across all tabs

## Conclusion
This project demonstrates real-time communication using WebSockets and shows how multiple users can collaborate on shared content efficiently.
