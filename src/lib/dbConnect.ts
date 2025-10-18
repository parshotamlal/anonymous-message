import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConnect(): Promise<void> {
  // If already connected, skip re-connecting
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  // Check if MongoDB URI is available
  if (!process.env.MONGODB_URI) {
    throw new Error(" MONGODB_URI is not defined in environment variables.");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    // Store connection state (1 = connected)
    connection.isConnected = db.connections[0].readyState;

    console.log(" New database connection established.");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Optional: exit if connection fails
  }
}

