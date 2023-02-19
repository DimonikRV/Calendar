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

export const postEvent = async (newEvent) => {
  try {
    const response = await fetch(webServerLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    if (!response.ok) {
      throw new Error("Failed to load data");
    }
  } catch (error) {
    console.log(error.message);
  }
};
