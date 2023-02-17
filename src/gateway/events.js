const webServerLink =
  "https://63a6da56f8f3f6d4ab138405.mockapi.io/api/v1/events";

export const getEvents = async () => {
  const response = await fetch(webServerLink);
  if (!response.ok) {
    throw new Error("Failed to load data");
  }
  const eventsData = await response.json();
  return eventsData;
};

export const setEvent = async (newEvent) => {
  try {
    const response = await fetch(webServerLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
  } catch (error) {
    throw new Error("Failed to post data");
  }
};

const events = [
  {
    id: 1,
    title: "Go to the gym",
    description: "some text here",
    dateFrom: new Date(2020, 8, 15, 10, 15),
    dateTo: new Date(2020, 8, 15, 15, 0),
  },
  {
    id: 2,
    title: "Go to the school",
    description: "hello, 2 am",
    dateFrom: new Date(2020, 8, 16, 10, 15),
    dateTo: new Date(2020, 8, 16, 11, 0),
  },
  {
    id: 3,
    title: "Lunch",
    description: "",
    dateFrom: new Date(2020, 8, 17, 10, 30),
    dateTo: new Date(2020, 8, 17, 11, 30),
  },
  {
    id: 4,
    title: "Meet friend",
    description: "at the cafe",
    dateFrom: new Date(2020, 8, 25, 10, 30),
    dateTo: new Date(2020, 8, 25, 11, 0),
  },
];

export default events;
