import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Trim and limit lengths
    const cleanName = name.trim().slice(0, 255);
    const cleanEmail = email.trim().slice(0, 255);
    const cleanSubject = subject.trim().slice(0, 500);
    const cleanMessage = message.trim().slice(0, 5000);

    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return NextResponse.json(
        { error: "All fields must contain valid content." },
        { status: 400 }
      );
    }

    // Insert into database
    const [result] = await pool.execute(
      "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [cleanName, cleanEmail, cleanSubject, cleanMessage]
    );

    const insertResult = result as { insertId: number };

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully.",
        id: insertResult.insertId,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Contact form error:", error);

    // Check for MySQL connection errors
    const err = error as { code?: string };
    if (err.code === "ECONNREFUSED") {
      return NextResponse.json(
        {
          error:
            "Database connection failed. Please make sure XAMPP MySQL is running.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );
    return NextResponse.json({ contacts: rows }, { status: 200 });
  } catch (error: unknown) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}
