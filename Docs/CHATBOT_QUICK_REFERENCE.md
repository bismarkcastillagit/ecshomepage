# Chatbot Quick Reference

## Visual Layout

```
┌─────────────────────────────────────┐
│  🟣 ECS Assistant                 ✖ │  ← Header with avatar and close
├─────────────────────────────────────┤
│                                     │
│  👋 Welcome to ECS Assistant!       │  ← Welcome screen (empty state)
│                                     │
│  I'm here to help you learn about  │
│  Elevate Cyber Solutions.           │
│  Ask me anything!                   │
│                                     │
│  Quick questions:                   │
│  ┌─────────────────────────────┐  │
│  │ What does your company do?  │  │  ← Quick prompt buttons
│  └─────────────────────────────┘  │
│  ┌─────────────────────────────┐  │
│  │ How can you help my business?│ │
│  └─────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│  [Type your message...]        [→] │  ← Input area
│  Press Enter to send               │
└─────────────────────────────────────┘

           🟣 ← Floating launcher button
          (bottom-right corner)
```

## Chat Conversation View

```
┌─────────────────────────────────────┐
│  🟣 ECS Assistant            🗑️  ✖ │  ← Clear chat & close buttons
├─────────────────────────────────────┤
│                                     │
│           ┌─────────────────┐      │
│           │ What do you do? │      │  ← User message (right-aligned)
│           └─────────────────┘      │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ We help businesses with...    │ │  ← AI response (left-aligned)
│  │ cloud, security, and          │ │
│  │ automation solutions!         │ │
│  └───────────────────────────────┘ │
│                                     │
│           ┌─────────────────┐      │
│           │ Tell me more!   │      │
│           └─────────────────┘      │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ • • •                         │ │  ← Loading indicator
│  └───────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  [Type your message...]        [→] │
│  Press Enter to send               │
└─────────────────────────────────────┘
```

## Color Scheme

- **Primary Purple**: `#C471FF` (accent color)
- **Hover Purple**: `#B05FE6`
- **Dark Background**: `#0a0a0a`
- **Message Bubble (User)**: Purple gradient
- **Message Bubble (AI)**: Dark gray (`#1f2937`)
- **Text**: White / Light gray

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line in message |
| `Esc` | Close chat panel |

## States

### Closed
- Floating purple button with chat icon
- Pulsing animation ring
- Positioned bottom-right corner

### Open (Empty)
- Chat panel slides up
- Welcome message displayed
- 4 quick-start prompts shown
- Input ready for typing

### Open (With Messages)
- Scrollable message history
- User messages: purple, right-aligned
- AI messages: gray, left-aligned
- Auto-scroll to latest message

### Loading
- Three animated dots
- Input disabled
- Send button disabled

## Responsive Behavior

### Desktop (> 768px)
- Panel width: 380px
- Max height: 70vh
- Fixed position: bottom-right

### Mobile (< 768px)
- Panel width: calc(100vw - 2rem)
- Max height: 70vh
- Centered horizontally
- Full-width on small screens

## Integration Points

### Frontend → Backend
```typescript
POST /api/chat
{
  "messages": [
    { "role": "user", "content": "Hello" }
  ],
  "metadata": {
    "audience": "non-technical",
    "source": "ecshomepage"
  }
}
```

### Backend → n8n
```typescript
POST {N8N_WEBHOOK_URL}
Headers: {
  "Authorization": "Bearer {N8N_BEARER_TOKEN}",
  "Content-Type": "application/json"
}
Body: {
  "messages": [...],
  "metadata": {...}
}
```

### n8n → Backend
```json
{
  "reply": "Your AI-generated response here"
}
```

### Backend → Frontend
```json
{
  "reply": "Your AI-generated response here"
}
```

## Sample Questions the Bot Can Answer

✅ "What does your company do?"  
✅ "How can you help my business?"  
✅ "Tell me about cloud services"  
✅ "What is cybersecurity?"  
✅ "Do you offer automation?"  
✅ "How do I get started?"  
✅ "What industries do you serve?"  
✅ "Can you give me an example?"  
✅ "What's the difference between DevOps and cloud?"  
✅ "How much do your services cost?"  

## Sample Bot Responses (Examples)

**Q: "What does your company do?"**

**A:** "We help businesses with technology in simple ways! We can move your systems to the cloud (online servers that are safer and more reliable), protect your data from hackers, automate boring repetitive tasks, and use AI to make your work easier. Think of us as your technology partner who makes complex tech simple and secure."

**Q: "How can you help my business?"**

**A:** "Great question! Here are a few ways:

1. Cloud Migration - We move your systems online so you can access them anywhere
2. Security - We protect your business from cyber threats and data breaches
3. Automation - We set up systems to handle repetitive tasks automatically
4. AI Solutions - We help you use smart technology to work faster

What area interests you most?"

## Customization Examples

### Add Industry-Specific Prompts
```typescript
const QUICK_PROMPTS = [
  'What does your company do?',
  'How can you help healthcare?', // Healthcare
  'Solutions for retail business?', // Retail
  'Manufacturing automation options?', // Manufacturing
];
```

### Change Button Color
```typescript
// In ChatWidget.tsx, change from purple to blue:
className="bg-gradient-to-br from-blue-500 to-blue-700"
```

### Adjust Panel Size
```typescript
// Make panel wider:
className="w-[480px] max-w-[calc(100vw-2rem)]"

// Make panel taller:
className="h-[700px] max-h-[80vh]"
```

### Add Company Logo to Header
```tsx
<div className="flex items-center gap-3">
  <Image src="/ecsvault-logo.png" alt="ECS" width={40} height={40} />
  <div>
    <h2>ECS Assistant</h2>
    <p>Ask me anything</p>
  </div>
</div>
```

## Monitoring & Analytics Ideas

Track these metrics (optional):
- Total conversations
- Messages per conversation
- Most asked questions
- Response satisfaction
- Peak usage times
- Average response time
- Error rate
- User drop-off points

## Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| Button not showing | Check `layout.tsx` includes `<ChatWidget />` |
| Not responding | Verify `.env.local` variables set correctly |
| 502 errors | Check n8n workflow is active and webhook URL is correct |
| Wrong answers | Update "Company Knowledge" node in n8n |
| Slow responses | Switch to `gpt-4o-mini` or `gpt-3.5-turbo` |
| Auth errors | Verify Bearer token matches in n8n and `.env.local` |

## Environment Variables Checklist

Create `.env.local` in project root:

```env
# ✅ Required for chatbot to work
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/ai-chat
N8N_BEARER_TOKEN=your_32_character_secret_token_here

# ❌ Do NOT commit this file to git
# ❌ Do NOT share these tokens publicly
```

## Testing Commands

```bash
# Start dev server
npm run dev

# Check for TypeScript errors
npm run build

# Access the site
open http://localhost:3000

# Test the chatbot
# 1. Click purple button bottom-right
# 2. Try a quick prompt
# 3. Type custom message
# 4. Check AI response
```

## Deploy Checklist

Before going live:

- [ ] n8n workflow activated
- [ ] OpenAI API key configured in n8n
- [ ] Bearer token set in n8n webhook
- [ ] Environment variables set in hosting platform
- [ ] Company information updated in n8n
- [ ] Test chatbot on production URL
- [ ] Verify HTTPS on webhook URL
- [ ] Monitor OpenAI usage/costs
- [ ] Set up alerts for errors

## Quick URLs

- **n8n Docs**: https://docs.n8n.io
- **OpenAI Platform**: https://platform.openai.com
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Need Help?** Check `Docs/N8N_CHATBOT_SETUP.md` for detailed setup instructions.

