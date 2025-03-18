
** How to Run the Project Locally

## git clone [<repository-url>](https://github.com/amrataabdallh/i-o-tech-tasc.git)

## cd i-o-tech-task

## npm install

## npm start

or 

## npm run dev


# Next.js Project with Tailwind CSS

## Introduction

This project uses **Next.js** to build the frontend application, with **Tailwind CSS** for styling the user interface. The application displays posts and includes features for creating, editing, and deleting posts using **SweetAlert2** for modal pop-ups. It also provides a dynamic page for each post, allowing users to view more details.

## Completed Steps in the Project

### 1. **Installed Next.js and Tailwind CSS**

- **Next.js** was installed to build the application using **React** with the benefits of **Server-side rendering (SSR)** and **Static Site Generation (SSG)**.
- **Tailwind CSS** was integrated into the project to facilitate fast and flexible UI development using customizable utility CSS classes.

### 2. **Created UI Components (Buttons and Post Cards)**

- A **Button** component was created to handle different button styles, such as buttons for "Create Post" or "Edit."
- A **PostCard** component was built to display the content of a post (title, body, date) within a styled UI.

### 3. **Used Loop to Display Posts via API**

- The application fetches data from an **API** to retrieve posts. Upon page load, the posts are fetched and displayed using a loop to render each post individually.
- If there is an error fetching data from the **API**, an error message is displayed to the user.

### 4. **Installed SweetAlert2 and Created Functions for Create, Edit, and Delete**

- **SweetAlert2** was used to display modals for performing different operations: creating a new post, editing an existing post, and deleting a post.
- Three main functions were created:
  - **Create Post**: A modal is presented where the user can enter the title and body to create a new post.
  - **Edit Post**: Allows users to edit the title and body of a selected post.
  - **Delete Post**: A confirmation modal appears, and upon confirming, the post is deleted from the UI.

### 5. **Created Dynamic Link for Each Post**

- **Dynamic Routing** was used in **Next.js** to create a dedicated page for each post. This allows users to click on a post's link (e.g., `/posts/[id]`) to navigate to its details.
- The link is integrated into the **PostCard** component so that when clicked, it directs the user to the post details page.

### 6. **Issue with Creating Dynamic Pages for Newly Added Posts**

- It was noticed that dynamic pages for newly added posts cannot be created, as the **API** is the sole source of data. A post that is added locally (without saving to the **API**) does not appear in its specific page.

### 7. **Local Edit Without Sending to API**

- Edits to posts are made locally using **useState** but are not sent to the **API** to ensure data synchronization with the server.

### 8. **No State Management (State Management Not Used)**

- No state management libraries such as **Redux** or **Context API** were used. **useState** was used in each component for managing data independently.

### **Challenges Faced**

1. **Creating Dynamic Pages for New Posts**: When a new post is added locally, it cannot have a dynamic page because there is no API interaction to store the data.
2. **Local Editing**: Edits are only applied locally to the UI and are not reflected in the **API**.
3. **State Management**: No state management solutions were used to manage global state, making it harder to share data across components.

### **Future Recommendations**

1. **Implement State Management**: It is recommended to use state management techniques like **Redux** or **Context API** for managing the state centrally across components.
2. **Sync Edits with API**: Ensure that edits made to posts are sent to the **API** to keep the data synchronized with the server.
3. **Ensure Correct Dynamic Page Routing**: Make sure that the `/posts/[id]` route works correctly when navigating to the specific post details page.

## Conclusion

The project was built using **Next.js** and **Tailwind CSS** to manage posts dynamically, allowing for creating, editing, and deleting posts using **SweetAlert2**. **Dynamic Routing** was used to create unique URLs for each post. Going forward, it is essential to implement state management and ensure that data syncs properly with the **API** for full functionality.


## I have utilized AI to assist in the Task.

