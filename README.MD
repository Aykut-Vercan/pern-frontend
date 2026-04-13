# Classroom Frontend

Admin and student dashboard for the Classroom management application. Built as a full-featured CRUD interface with charts, tables, and role-based views.

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React 19 + TypeScript** | UI framework |
| **Vite** | Build tool and dev server |
| **Refine** | CRUD framework (data fetching, routing, auth) |
| **React Router 7** | Client-side routing |
| **TanStack Table** | Data tables with sorting, filtering, pagination |
| **TanStack Query** | Server state management |
| **React Hook Form + Zod** | Forms and validation |
| **Tailwind CSS v4** | Utility-first styling |
| **shadcn/ui + Radix UI** | UI component library |
| **Recharts** | Charts and data visualization |
| **Better Auth** | Authentication client |
| **Cloudinary** | Image uploads (profile photos, class banners) |

## Project Structure

```
src/
├── pages/
│   ├── Dashboard.tsx         # Home page with stats and charts
│   ├── departments/          # List, show, create
│   ├── subjects/             # List, show, create
│   ├── classes/              # List, show, create
│   ├── enrollments/          # Enroll by select or invite code
│   ├── faculty/              # User list and profile view
│   └── login / register/     # Auth pages
├── components/
│   ├── refine-ui/            # Layout, tables, buttons, forms
│   └── ui/                   # shadcn base components
├── providers/
│   ├── auth.ts               # Refine auth provider
│   └── data.ts               # Refine data provider (REST)
└── App.tsx                   # Routes and resource definitions
```

## Pages

| Page | Description |
|------|-------------|
| **Dashboard** | KPI cards, role pie chart, bar charts, newest classes and teachers |
| **Departments** | List with search, detail view with subjects and classes |
| **Subjects** | List with filters, detail view with classes and users |
| **Classes** | List with subject/teacher filters, detail view with join instructions |
| **Enrollments** | Enroll by selecting a class or entering an invite code |
| **Faculty** | User list with role filter, profile view with associated departments and subjects |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables

# Start development server
npm run dev
```

## Environment Variables

```env
VITE_BACKEND_BASE_URL=http://localhost:8000/api
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```
