import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { tasks } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const task of tasks) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "mizanr6567@gmail.com", // replace with actual user email
      subject: `Reminder: ${task.name}`,
      text: `Your task "${task.name}" is due by ${task.endAt}`,
    });
  }

  return new Response(JSON.stringify({ message: "Reminders sent" }), {
    status: 200,
  });
}
