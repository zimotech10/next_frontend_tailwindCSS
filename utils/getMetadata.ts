export const getMetadata = async (uri: string): Promise<any> => {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`);
    }
    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error;
  }
};
