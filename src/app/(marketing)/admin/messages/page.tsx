import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { Mail, Calendar, User, AlignLeft } from "lucide-react";

const prisma = new PrismaClient();

// This runs entirely on the server (Next.js Server Component)
async function getMessages() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return messages;
}

export const revalidate = 0; // Disable caching so it always shows the latest messages

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div className="pt-32 pb-24 px-6 relative z-10 max-w-[1180px] mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-foreground mb-4">
          Admin <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-start to-gold-end">Inbox</span>
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          View all messages submitted through the contact form on your website.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-[24px]">
          <Mail className="w-12 h-12 mx-auto text-muted mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-foreground mb-2">No messages yet</h3>
          <p className="text-muted">When someone fills out the contact form, their message will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map((msg) => (
            <div key={msg.id} className="glass-panel rounded-[24px] overflow-hidden group hover:border-gold-start/30 transition-colors duration-300">
              {/* Header */}
              <div className="bg-steel-start/20 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-steel-start/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-start/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 border border-gold-start/20">
                    <User className="w-5 h-5 text-gold-start" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-gold-start hover:underline">{msg.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(msg.createdAt), "MMM d, yyyy 'at' h:mm a")}
                </div>
              </div>
              
              {/* Body */}
              <div className="p-6">
                <h4 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
                  {msg.subject}
                </h4>
                <div className="text-muted leading-relaxed whitespace-pre-wrap flex gap-3">
                  <AlignLeft className="w-5 h-5 flex-shrink-0 mt-1 opacity-40" />
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
