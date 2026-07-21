export interface Lead {
  id: string;
  full_name: string;
  corporate_email: string;
  industry_sector: string;
  message: string | null;
  ip_address: string | null;
  created_at: Date;
}

export interface ChatSession {
  id: string;
  session_token: string;
  created_at: Date;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender_type: 'user' | 'assistant';
  message_text: string;
  timestamp: Date;
}
