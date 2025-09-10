import { NextRequest } from "next/server";
import clientPromise from "../../../Shared/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop(); // extract ID from URL
  const body = await req.json();

  const client = await clientPromise;
  const db = client.db("taskdb");

  await db.collection("tasks").updateOne(
    { _id: new ObjectId(id) },
    { $set: body }
  );

  return new Response(JSON.stringify({ message: "Task updated" }), {
    status: 200,
  });
}
