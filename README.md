# ✦ Flowdeck

### A modern, collaborative task management platform inspired by Trello.

<p align="center">
  <strong>Plan. Organize. Collaborate. Move Work Forward.</strong>
</p>

<p align="center">
  <a href="https://flow-desk-trello.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Flowdeck-black?style=for-the-badge" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
</p>

<p align="center">
  <a href="https://flow-desk-trello.vercel.app">🌐 Live Application</a>
  &nbsp; • &nbsp;
  <a href="#-features">Features</a>
  &nbsp; • &nbsp;
  <a href="#-tech-stack">Tech Stack</a>
  &nbsp; • &nbsp;
  <a href="#-getting-started">Getting Started</a>
</p>

---

## 🌐 Live Demo

Experience Flowdeck here:

### 👉 https://flow-desk-trello.vercel.app

> **Flowdeck** is a full-stack task and project management application where users can create workspaces, organize projects into boards, manage lists and cards, collaborate on tasks, track activity, and manage subscriptions.

---

## ✨ What is Flowdeck?

Flowdeck is a **Trello-inspired project management platform** built with modern full-stack technologies.

The goal was to create a clean and intuitive workspace where teams can transform large projects into manageable workflows using a familiar **Boards → Lists → Cards** structure.

Whether you're managing software development, personal projects, academic work, marketing campaigns, or team operations, Flowdeck provides a visual way to organize everything in one place.

### The core idea

```text
Workspace
    │
    ├── Board
    │    │
    │    ├── List
    │    │    ├── Card
    │    │    ├── Card
    │    │    └── Card
    │    │
    │    ├── List
    │    │    └── Card
    │    │
    │    └── List
    │
    ├── Activity
    └── Billing / Subscription
```

---

# 🚀 Features

## 🏢 Workspace Management

Create and switch between multiple workspaces using Clerk-powered organization management.

* Multiple organizations/workspaces
* Workspace switching
* Organization-specific boards
* Organization-level limits
* Persistent workspace navigation
* Protected application routes

---

## 📋 Visual Project Boards

Create beautiful project boards with customizable backgrounds.

Each board acts as a central workspace for organizing a project.

**Board capabilities include:**

* Create boards
* Rename boards
* Delete boards
* Custom board backgrounds
* Board-specific lists and cards
* Workspace-based board isolation

Board backgrounds can be selected using images provided through **Unsplash**.

---

## 🗂️ Lists & Workflow Management

Organize work into flexible lists representing different stages of your workflow.

For example:

```text
┌──────────────┐
│   TODO       │
├──────────────┤
│ Design UI    │
│ Setup API    │
│ Write Tests  │
└──────────────┘

┌──────────────┐
│ IN PROGRESS  │
├──────────────┤
│ Build Auth   │
│ Database     │
└──────────────┘

┌──────────────┐
│   DONE       │
├──────────────┤
│ Landing Page │
│ Deployment   │
└──────────────┘
```

Lists can be:

* Created
* Updated
* Deleted
* Reordered
* Copied

---

## 🃏 Powerful Card Management

Cards represent individual tasks inside a list.

Each card supports:

* Task titles
* Descriptions
* Drag & drop movement
* Editing
* Deletion
* Copying
* Activity history
* Ordering within lists
* Moving between lists

Cards can be opened in a dedicated modal for a more detailed task-management experience.

---

## 🖱️ Drag & Drop

Flowdeck provides an interactive drag-and-drop workflow for both:

* Lists
* Cards

Powered by:

**`@hello-pangea/dnd`**

This allows users to naturally reorganize their workflow instead of relying on complicated forms or menus.

---

## 📜 Activity & Audit Logs

Flowdeck maintains an activity history for important workspace actions.

Tracked operations include:

* `CREATE`
* `UPDATE`
* `DELETE`

Tracked entities include:

* Boards
* Lists
* Cards

Each audit entry stores information such as:

* User
* User avatar
* Action
* Entity
* Entity ID
* Entity title
* Organization
* Timestamp

This provides a useful activity trail for understanding what changed inside a workspace.

---

## 💳 Subscription & Billing

Flowdeck includes a subscription architecture powered by **Stripe**.

The application supports:

* Free workspace limits
* Pro subscription state
* Stripe customer information
* Stripe subscription information
* Subscription period tracking
* Upgrade flow
* Stripe webhook handling

Free workspaces are limited in the number of active boards, while subscribed workspaces can unlock additional capacity.

---

## 🔐 Authentication & Organizations

Authentication and organization management are handled using **Clerk**.

The application supports:

* User authentication
* Sign up
* Sign in
* Organization selection
* Organization membership
* Protected routes
* Organization-aware data access

The application checks the authenticated organization before allowing access to workspace resources.

---

## 📱 Responsive Interface

Flowdeck is designed to work across different screen sizes.

The application includes:

* Desktop dashboard
* Responsive navigation
* Mobile sidebar
* Responsive board layouts
* Modal-based card editing
* Mobile-friendly workspace controls

---

# 🧠 Architecture

Flowdeck follows a modern Next.js full-stack architecture.

```text
                    ┌─────────────────────┐
                    │      Next.js        │
                    │   App Router        │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
          ┌──────▼──────┐             ┌──────▼──────┐
          │   React UI  │             │ Server Side │
          │ Components  │             │   Logic     │
          └──────┬──────┘             └──────┬──────┘
                 │                           │
                 │                    ┌──────▼──────┐
                 │                    │   Server    │
                 │                    │   Actions   │
                 │                    └──────┬──────┘
                 │                           │
                 └──────────────┬────────────┘
                                │
                         ┌──────▼──────┐
                         │   Prisma    │
                         │    ORM      │
                         └──────┬──────┘
                                │
                         ┌──────▼──────┐
                         │ PostgreSQL  │
                         └─────────────┘
```

External services integrate into the architecture for authentication, images, and billing.

```text
              Flowdeck
                 │
       ┌─────────┼──────────┐
       │         │          │
    Clerk     Unsplash    Stripe
     Auth      Images     Billing
       │         │          │
       └─────────┼──────────┘
                 │
             Next.js
                 │
              Prisma
                 │
            PostgreSQL
```

---

# 🛠️ Tech Stack

## Frontend

| Technology       | Purpose                    |
| ---------------- | -------------------------- |
| **Next.js 16**   | Full-stack React framework |
| **React 19**     | UI development             |
| **TypeScript**   | Type-safe development      |
| **Tailwind CSS** | Styling                    |
| **Radix UI**     | Accessible UI primitives   |
| **Lucide React** | Icons                      |
| **Zustand**      | Client-side state          |
| **React Query**  | Server-state management    |
| **Sonner**       | Toast notifications        |

## Backend

| Technology                 | Purpose               |
| -------------------------- | --------------------- |
| **Next.js Server Actions** | Server-side mutations |
| **Next.js API Routes**     | Backend endpoints     |
| **Prisma**                 | Database ORM          |
| **PostgreSQL**             | Relational database   |
| **Zod**                    | Input validation      |

## Authentication & Services

| Service      | Purpose                        |
| ------------ | ------------------------------ |
| **Clerk**    | Authentication & organizations |
| **Stripe**   | Subscription & billing         |
| **Unsplash** | Board background images        |

## Interaction

| Technology            | Purpose                   |
| --------------------- | ------------------------- |
| **@hello-pangea/dnd** | Drag & drop functionality |
| **date-fns**          | Date utilities            |
| **lodash**            | Utility functions         |
| **usehooks-ts**       | React hooks               |

---

# 🗃️ Database Design

The PostgreSQL database is modeled using Prisma.

### Main entities

```text
Board
 │
 └── List
      │
      └── Card
```

Additional entities provide platform functionality:

```text
Organization
 ├── Boards
 ├── Audit Logs
 ├── Organization Limit
 └── Organization Subscription
```

### Core Prisma models

* `Board`
* `List`
* `Card`
* `AuditLog`
* `OrgLimit`
* `OrgSubscription`

### Board → List → Card relationship

```text
Board
 ├── id
 ├── orgId
 ├── title
 ├── imageId
 ├── imageThumbUrl
 ├── imageFullUrl
 └── lists[]
       │
       ├── id
       ├── title
       ├── order
       └── cards[]
              │
              ├── id
              ├── title
              ├── description
              └── order
```

Cascade deletion is used for hierarchical resources, so deleting a board also removes its associated lists and cards.

---

# 🔄 Server Actions

Flowdeck uses dedicated server actions for core mutations.

```text
Board
 ├── create-board
 ├── update-board
 └── delete-board

List
 ├── create-list
 ├── update-list
 ├── delete-list
 ├── copy-list
 └── update-list-order

Card
 ├── create-card
 ├── update-card
 ├── delete-card
 ├── copy-card
 └── update-card-order

Billing
 └── stripe-redirect
```

This keeps mutation logic organized and separated by responsibility.

---

# 📁 Project Structure

```text
trello-main/
│
├── actions/
│   ├── copy-card/
│   ├── copy-list/
│   ├── create-board/
│   ├── create-card/
│   ├── create-list/
│   ├── delete-board/
│   ├── delete-card/
│   ├── delete-list/
│   ├── update-board/
│   ├── update-card/
│   ├── update-card-order/
│   ├── update-list/
│   └── update-list-order/
│
├── app/
│   ├── (marketing)/
│   ├── (platform)/
│   │   ├── (clerk)/
│   │   └── (dashboard)/
│   ├── api/
│   │   ├── cards/
│   │   └── webhook/
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── form/
│   ├── modals/
│   ├── providers/
│   └── ui/
│
├── constants/
│
├── features/
│   ├── marketing/
│   └── platform/
│       └── dashboard/
│           ├── activity/
│           ├── billing/
│           ├── board/
│           ├── organization/
│           └── components/
│
├── hooks/
│
├── lib/
│   ├── db.ts
│   ├── stripe.ts
│   ├── unsplash.ts
│   ├── subscription.ts
│   ├── org-limit.ts
│   └── utils.ts
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── types.ts
├── proxy.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

# ⚡ Getting Started

Follow these steps to run Flowdeck locally.

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd trello-main
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env.local` file in the project root.

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# Unsplash
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY="your_unsplash_access_key"

# Stripe
STRIPE_API_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
```

> **Important:** Never commit `.env.local` or secret API keys to GitHub.

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Set up the database

Push the Prisma schema to your PostgreSQL database:

```bash
npx prisma db push
```

For local development, you can also inspect the database with:

```bash
npx prisma studio
```

---

## 6. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# 🧪 Available Scripts

| Command               | Description                     |
| --------------------- | ------------------------------- |
| `npm run dev`         | Start development server        |
| `npm run build`       | Create production build         |
| `npm run start`       | Start production server         |
| `npm run lint`        | Run ESLint                      |
| `npx prisma generate` | Generate Prisma Client          |
| `npx prisma db push`  | Push schema changes to database |
| `npx prisma studio`   | Open Prisma database browser    |

---

# 🔒 Environment & Security

Flowdeck relies on several external services, so environment variables are required.

### Required service configuration

**Clerk**

Used for:

* Authentication
* Organizations
* Memberships
* User identity

**PostgreSQL**

Used for:

* Boards
* Lists
* Cards
* Activity logs
* Organization limits
* Subscription records

**Unsplash**

Used for:

* Board background images

**Stripe**

Used for:

* Subscription management
* Customer information
* Billing state
* Webhooks

---

# 🎯 Product Flow

A typical Flowdeck workflow looks like this:

```text
        👤 User
          │
          ▼
    🔐 Sign In / Sign Up
          │
          ▼
    🏢 Select Workspace
          │
          ▼
      📋 Create Board
          │
          ▼
     🗂️ Create Lists
          │
          ▼
      🃏 Add Cards
          │
          ▼
     🖱️ Drag & Drop
          │
          ▼
    📝 Update Tasks
          │
          ▼
     📜 Activity Log
          │
          ▼
    🚀 Project Complete
```

---

# 💡 Design Philosophy

Flowdeck is designed around a simple principle:

> **Reduce the friction between thinking about work and actually doing it.**

Instead of overwhelming users with complicated project-management interfaces, the application focuses on a visual workflow:

**Workspace → Board → List → Card**

This makes it easy to understand the current state of a project at a glance.

---

# 🚧 Potential Future Improvements

The current architecture provides a strong foundation for extending Flowdeck further.

Possible improvements include:

* 👥 Real-time collaborative board updates
* 💬 Card comments
* 📎 File attachments
* 🏷️ Labels and tags
* 📅 Due dates
* 🔔 Notifications
* 👤 Card assignments
* 🔎 Global search
* 📊 Project analytics
* 📈 Productivity dashboards
* 🌙 Dark mode
* 📱 Progressive Web App support
* ⚡ Optimistic drag-and-drop updates
* 🧑‍🤝‍🧑 Team mentions
* 🔗 Shareable boards
* 🗓️ Calendar integration

---

# 🧑‍💻 Why This Project?

Flowdeck was built as a practical full-stack application to explore and demonstrate concepts such as:

* Modern Next.js architecture
* Server-side data mutations
* Relational database modeling
* Authentication and authorization
* Multi-tenant organization architecture
* Drag-and-drop interfaces
* Subscription-based application architecture
* REST-style API routes
* Audit logging
* Third-party API integrations
* Responsive UI development
* Type-safe application development

Rather than being only a UI exercise, Flowdeck brings together **frontend, backend, database, authentication, external APIs, and billing** into one application.

---

# 🌟 Highlights

```text
┌─────────────────────────────────────────────────┐
│                  FLOWDECK                       │
├─────────────────────────────────────────────────┤
│                                                 │
│   🔐 Secure Authentication                     │
│   🏢 Multi-Workspace Architecture              │
│   📋 Visual Project Boards                     │
│   🗂️ Flexible Lists                            │
│   🃏 Rich Task Cards                            │
│   🖱️ Drag & Drop                               │
│   📜 Activity Tracking                          │
│   💳 Stripe Billing                             │
│   🗄️ PostgreSQL + Prisma                       │
│   🎨 Unsplash Board Backgrounds                │
│   📱 Responsive UI                              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

# 🚀 Live Application

Try Flowdeck yourself:

<p align="center">

### [🌐 Open Flowdeck](https://flow-desk-trello.vercel.app)

</p>

---

# 📄 License

This project is intended primarily for learning, experimentation, and portfolio purposes.

If you use or extend this project, feel free to make it your own and build something awesome on top of it.

---

<p align="center">
  <strong>Built with ☕, TypeScript, and a lot of drag & drop.</strong>
</p>

<p align="center">
  <a href="https://flow-desk-trello.vercel.app">Flowdeck</a>
  ·
  <strong>Plan → Organize → Execute → Ship 🚀</strong>
</p>
