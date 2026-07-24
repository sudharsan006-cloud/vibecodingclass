import { NextRequest, NextResponse } from "next/server";

// Mock in-memory storage to bypass Vercel DB connection issues
let mockContacts: any[] = [
  {
    id: "mock-1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Hello Finfix",
    message: "This is a test message to show the admin dashboard works without a DB.",
    createdAt: new Date(),
  }
];

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

    // Insert into mock database
    const newContact = {
      id: Math.random().toString(36).substring(7),
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      createdAt: new Date()
    };
    
    mockContacts.unshift(newContact);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully.",
        id: newContact.id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({ contacts: mockContacts }, { status: 200 });
  } catch (error: unknown) {
    console.error("Fetch contacts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}
