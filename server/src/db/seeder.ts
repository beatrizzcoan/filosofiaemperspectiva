import { Story } from "@/models/story.entity";
import storiesData from "./data/stories.json";

export async function seedDatabase() {
  const storyCount = await Story.count();

  if (storyCount > 0) {
    console.log("Database already seeded. Skipping.");
    return;
  }

  console.log("Seeding database with initial stories...");

  try {
    await Story.bulkCreate(storiesData);
    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}
