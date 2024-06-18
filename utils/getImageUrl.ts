export async function getImageUrl(uri: string): Promise<string | undefined> {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${uri}`);
    }
    const data = await response.json();
    return data.image; // Assuming the JSON has an "image" field containing the image URL
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return undefined;
  }
}
