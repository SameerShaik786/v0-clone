# v0-Clone - AI-Powered Code Generation Platform

A full-stack AI code generation platform inspired by Vercel's v0. Built with Next.js 16, this platform lets you describe any UI or web application idea in plain English and watch as AI generates working, deployable code in real-time.

![v0-clone Demo](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![TypeScript](https://img.shields.io/badge/AI-Gemini-4285F4?style=flat-square&logo=google)

## What It Does

You type something like "Build me a landing page for a coffee shop with a hero section, menu grid, and contact form" and the AI generates complete, working React code. The generated app runs live in a cloud sandbox so you can preview it immediately, tweak the styling, or download the code.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 18, Tailwind CSS 4 |
| Authentication | Clerk |
| Database | PostgreSQL (Neon) + Prisma ORM |
| AI Agent | Inngest + Gemini 2.5 Flash |
| Code Sandbox | E2B (cloud execution) |
| Code Highlighting | Shiki + Monaco Editor |
| UI Components | Radix UI + shadcn/ui |

---

## How It Works

### High-Level Flow

```
User Input → Create Project → Trigger AI Agent → Generate Code → Run in Sandbox → Display Preview
```

### Detailed Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend (Next.js)
    participant A as Auth (Clerk)
    participant D as Database (Prisma/Neon)
    participant I as Inngest Queue
    participant AI as AI Agent (Gemini)
    participant S as Sandbox (E2B)

    U->>F: Submit project description
    F->>A: Verify authentication
    A-->>F: User authenticated
    F->>D: Create project + user message
    F->>I: Trigger code-agent/run event
    F-->>U: Redirect to project page (loading state)
    
    I->>S: Create E2B sandbox
    S-->>I: Sandbox ready (Next.js running)
    I->>AI: Send prompt + context
    AI->>S: Write files via tools
    AI->>S: Run terminal commands
    AI-->>I: Code generation complete
    I->>D: Save assistant message + fragment
    
    F->>D: Poll for new messages
    D-->>F: Return assistant response + files
    F->>S: Load sandbox preview
    F-->>U: Display live preview + code
```

---

## Project Structure

```
vo/
├── app/                    # Next.js app router
│   ├── (auth)/            # Auth pages (sign-in, sign-up)
│   ├── (root)/            # Main dashboard
│   └── project/[id]/      # Individual project view
│
├── modules/               # Feature modules
│   ├── auth/             # Authentication logic
│   ├── home/             # Dashboard components
│   ├── projects/         # Project management
│   ├── messages/         # Chat interface
│   └── fragment/         # Code preview & editor
│
├── inngest/              # Background job processing
│   ├── client.js         # Inngest client setup
│   └── functions.js      # AI agent workflow
│
├── prisma/
│   └── schema.prisma     # Database models
│
├── components/           # Shared UI components
└── lib/                  # Utilities
```

---

## Database Schema

Each **User** can have multiple **Projects**. Each **Project** contains multiple **Messages** (the conversation between user and AI). When the AI generates code, that **Message** gets a **Fragment** attached which holds the sandbox URL and generated files.

```mermaid
erDiagram
    User ||--o{ Project : "has many"
    Project ||--o{ Message : "has many"
    Message ||--o| Fragment : "has one (optional)"

    User {
        string id PK
        string email UK
        string name
        string image
        string clerkId UK
    }

    Project {
        string id PK
        string name
        string userId FK
        datetime createdAt
    }

    Message {
        string id PK
        string content
        enum role
        enum type
        string projectId FK
    }

    Fragment {
        string id PK
        string messageId FK
        string sandboxUrl
        string title
        json files
    }
```

---

## The AI Agent Pipeline

The core magic happens in the Inngest function. Here's how a single request flows:

### Workflow Diagram

```mermaid
flowchart TD
    A[User submits prompt] --> B[Create E2B Sandbox]
    B --> C[Start Next.js dev server]
    C --> D[Wait for server ready]
    D --> E[Initialize Coding Agent]
    
    E --> F{Agent Loop}
    F --> G[Read prompt/context]
    G --> H[Call Gemini AI]
    H --> I{Tool calls?}
    
    I -->|createFile| J[Write files to sandbox]
    I -->|terminal| K[Run commands]
    I -->|readFile| L[Read existing files]
    
    J --> F
    K --> F
    L --> F
    
    I -->|Done| M[Generate summary]
    M --> N[Response Agent formats output]
    N --> O[Save to database]
    O --> P[Return sandbox URL + files]
```

### Agent Tools

The AI has three tools at its disposal:

| Tool | Purpose |
|------|---------|
| `createFile` | Write or update files in the sandbox |
| `terminal` | Execute shell commands (npm install, etc.) |
| `readFile` | Read existing file contents |

---

## Features

- **Natural Language to Code** - Describe what you want, get working code
- **Live Preview** - See your generated app running instantly
- **Code Editor** - View and copy the generated source files
- **Project History** - All your projects saved and accessible
- **Dark/Light Mode** - Theme toggle for comfortable coding
- **Mobile Responsive** - Works on all screen sizes

---

## Works on Mobile

Not just a desktop tool. The entire interface adapts to mobile screens, so you can describe ideas and generate code from your phone. The chat interface, code preview, and live demo all work seamlessly on smaller screens. Vibe code from anywhere.

---

## How I Built This

1. **Started with Next.js 16** - Using the new app router for clean routing
2. **Added Clerk** - Handles all auth so I didn't have to build login flows
3. **Set up Prisma** - Connected to Neon PostgreSQL for persistence
4. **Integrated Inngest** - For reliable background job processing
5. **Built the AI Agent** - Used Gemini with custom tools for code generation
6. **Connected E2B** - Cloud sandboxes to run the generated code
7. **Created the UI** - Resizable panels, code highlighting, live preview

---

## What I Learned

- Building AI agents that can actually write and execute code
- Managing long-running background jobs with Inngest
- Working with cloud code execution environments (E2B)
- Creating a responsive IDE-like interface in React

---

## Future Ideas

- [ ] Add more AI models (Claude, GPT-4)
- [ ] Template library for quick starts
- [ ] Collaborative editing
- [ ] Deploy generated projects to Vercel
- [ ] Version history for projects

---

## License

MIT License - feel free to use this for learning or building your own projects.

---

Built by [Sameer Shaik](https://github.com/SameerShaik786)
