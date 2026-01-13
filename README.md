# Us

[My Notes](notes.md)

This application will provide direct messaging exclusively between the user and one other person. Embedded within the chat will be the ability to save messages to a shared timeline. Within the timeline you will also be able to upload custom entries that serve to keep a record of fun memories and key events in your relationship. The goal is to create a messaging application designed for use between you and your partner and make it easy to document memories and moments so that they are saved for years to come. 

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] Proper use of Markdown
- [ ] A concise and compelling elevator pitch
- [ ] Description of key features
- [ ] Description of how you will use each technology
- [ ] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

 The substance of life is connecting with people. With so much of our connection happening online on an increasing number of platforms it's easy for those moments of connection to get lost in the shuffle, or stuck behind ten minutes of scrolling to find that one message. _Us_ redefines that experience with the most important person in your life. _Us_ provides the perfect place to connect with your special someone, away from the jumble of messages and notifications in other apps to focus only on them. When you get a message that melts your heart or makes your laugh out loud, quickly save it to the built-in timeline, along with your favorite memories and moments so that you can always remember the things that made you and them, _Us_.

### Design
<div>
<img src="Us_Mockups1.jpg" width="600">
<img src="Us_Mockups2.jpg" width="200">
</div>


### Key features

- Secure login over HTTPS
- Link profiles with partner
- Instant message with partner
- Shared timeline with ability to add messages from the chat and longer custom entries
- Persisent storage of messages and timeline and functionality to scroll through both
- Account page with user info and options/settings

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Used to structure the application. Four HTML pages including a sign-in, chat, timeline, and account page
- **CSS** - Used for application styling that looks clean and simple on various screen sizes. Thoughtful spacing and sizing of elements with a unified color scheme
- **React** - Used for login, switching between pages, displaying chats, handling scrolling, making components, and calling backend services to send and load messages
- **Service** - Backend service with the following endpoints:
    - login authentication
    - account linking
    - sending messages
    - loading message history
    - updating timeline
    - loading timeline
    - pull from BoredAPI to generate ideas to do together
- **DB/Login** - Store users, messages, and timeline in database with their associated metadata. Store account credentials as well as which users are linked, only allowing for each user to be linked to one other user.
- **WebSocket** - Delivering messages to recipient and posting updates to the timeline

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
