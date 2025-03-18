import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch posts from the API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

const postSlice = createSlice({
  name: 'post',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    updatePost: (state, action) => {
      const post = state.find((post) => post.id === action.payload);
      if (post) post.completed = !post.completed;
    },
    removePost: (state, action) => {
      return state.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        // Optionally, handle loading state here if needed
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // Replace initial state with the data fetched from the API
        return action.payload.map((post) => ({
          ...post,
          completed: false, // Default value for the 'completed' property
        }));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        // Optionally, handle errors here
        console.error(action.error.message);
      });
  },
});

export const { addPost, updatePost, removePost } = postSlice.actions;
export default postSlice.reducer;
