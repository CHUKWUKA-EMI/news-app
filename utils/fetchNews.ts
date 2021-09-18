import { API_BASE_URL } from "./utils";
import axios from "axios";

export interface Story {
  id: number;
  by: string;
  title: string;
  score: number;
  kids?: number[];
  time: number;
  url: string;
}

type Stories = Story[];

async function getStory(storyId: number): Promise<Story | undefined> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/item/${storyId}.json?print=pretty`
    );
    const { id, by, time, url, kids, title, score }: Story = response.data;
    const story = { id, by, time, url, kids, title, score };
    return story;
  } catch (error) {
    console.log(error);
  }
}

export const getStories = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/topstories.json?print=pretty`
    );
    // if (response.status === 200) {
    const { data: storiesIds } = response;
    const resData = await Promise.all(
      storiesIds.slice(0, 40).map((id: number) => getStory(id))
    );
    return resData;
    // }
  } catch (error) {
    console.log(error);
  }
};
