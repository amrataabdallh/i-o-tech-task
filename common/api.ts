import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Define a type for the expected data response
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Reusable function to fetch data with TypeScript types
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axios.get<T>(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error for handling in components
  }
};
