"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Mail, Calendar, AlignLeft, RefreshCw, Inbox, Search, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMessages = async (showRefreshAnimation = false) => {
    try {
      if (showRefreshAnimation) setRefreshing(true);
      else setLoading(true);
      setError("");

      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);

      const data = await res.json();
      setMessages(data.contacts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((msg) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      msg.name.toLowerCase().includes(q) ||
      msg.email.toLowerCase().includes(q) ||
      msg.subject.toLowerCase().includes(q) ||
      msg.message.toLowerCase().includes(q)
    );
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="pt-32 pb-24 px-6 relative z-10 max-w-[1180px] mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-foreground mb-4">
            Admin{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-start to-gold-end">
              Inbox
            </span>
          </h1>
          <p className="text-lg text-muted max-w-2xl">
            View all messages submitted through the contact form on your website.
          </p>
        </motion.div>
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-foreground text-sm focus:outline-none focus:border-gold-start/50 focus:bg-white/10 transition-all placeholder:text-muted/50"
          />
        </div>

        {/* Stats + Refresh */}
        <div className="flex items-center gap-3">
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-muted whitespace-nowrap">
            <span className="text-gold-start font-semibold">{messages.length}</span>{" "}
            {messages.length === 1 ? "message" : "messages"}
          </div>
          <button
            onClick={() => fetchMessages(true)}
            disabled={refreshing}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-start/30 rounded-xl px-4 py-3 text-sm text-muted hover:text-foreground transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-white/5" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-gold-start animate-spin" />
          </div>
          <p className="text-muted mt-6 text-sm">Loading messages...</p>
        </motion.div>
      )}

      {/* Error State */}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-red-400 mb-2">Failed to load messages</h3>
          <p className="text-muted text-sm mb-6">{error}</p>
          <button
            onClick={() => fetchMessages()}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-6 py-2.5 text-sm text-foreground transition-all"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredMessages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.02] border border-white/5 rounded-[24px] p-16 text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gold-start/10 to-blue-500/10 flex items-center justify-center mb-6 border border-gold-start/10">
            <Inbox className="w-8 h-8 text-muted opacity-50" />
          </div>
          <h3 className="text-xl font-heading font-medium text-foreground mb-3">
            {searchQuery ? "No matching messages" : "No messages yet"}
          </h3>
          <p className="text-muted max-w-md mx-auto">
            {searchQuery
              ? `No messages found matching "${searchQuery}". Try a different search term.`
              : "When someone fills out the contact form, their message will appear here."}
          </p>
        </motion.div>
      )}

      {/* Messages List */}
      {!loading && !error && filteredMessages.length > 0 && (
        <div className="grid grid-cols-1 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                layout
                className="group"
              >
                <div
                  className={`rounded-[20px] overflow-hidden border transition-all duration-300 cursor-pointer ${
                    expandedId === msg.id
                      ? "bg-white/[0.04] border-gold-start/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]"
                      : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                  }`}
                  onClick={() => toggleExpand(msg.id)}
                >
                  {/* Compact Header */}
                  <div className="px-6 py-5 flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-start/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 border border-gold-start/15 group-hover:border-gold-start/30 transition-colors">
                      <span className="text-sm font-semibold text-gold-start">
                        {msg.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-foreground font-medium truncate">
                          {msg.name}
                        </h3>
                        <span className="text-xs text-muted hidden sm:inline">
                          {msg.email}
                        </span>
                      </div>
                      <p className="text-sm text-muted/80 truncate">
                        <span className="text-foreground/70 font-medium">{msg.subject}</span>
                        {!expandedId || expandedId !== msg.id ? (
                          <span className="ml-2 text-muted/50">— {msg.message.slice(0, 80)}...</span>
                        ) : null}
                      </p>
                    </div>

                    {/* Date + Expand */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-muted hidden md:inline">
                        {format(new Date(msg.createdAt), "MMM d, yyyy")}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                        {expandedId === msg.id ? (
                          <ChevronUp className="w-4 h-4 text-muted" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedId === msg.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="border-t border-white/5 pt-5">
                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-4 mb-5 text-xs text-muted">
                              <div className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5" />
                                <a
                                  href={`mailto:${msg.email}`}
                                  className="text-gold-start hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {msg.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {format(new Date(msg.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                              </div>
                            </div>

                            {/* Message Body */}
                            <div className="bg-white/[0.02] rounded-xl p-5 border border-white/5">
                              <div className="flex gap-3">
                                <AlignLeft className="w-4 h-4 flex-shrink-0 mt-1 text-muted/40" />
                                <p className="text-muted leading-relaxed whitespace-pre-wrap text-sm">
                                  {msg.message}
                                </p>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-4">
                              <a
                                href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 bg-gradient-to-r from-gold-start to-gold-end text-primary rounded-xl px-5 py-2.5 text-sm font-medium hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                              >
                                <Mail className="w-4 h-4" />
                                Reply
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
