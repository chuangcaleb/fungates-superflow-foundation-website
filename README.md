# Fungates Superflow Foundation Website

This repository has the source code for the Fungates Superflow Foundation website. Both the frontend site and the admin panel are hosted together with [Payload CMS](https://payloadcms.com) (using [Next.js](https://nextjs.org) under the hood), and other modern web technologies.

## Tech Stack

- **Payload CMS Backend**: A powerful, TypeScript-first, Next.js-native CMS.
- **Next.js Frontend**: A modern, performant frontend built with the Next.js App Router.
- **Authentication**: Custom secure user authentication with roles and access control.
- **Layout Builder**: Dynamic page creation using a flexible block-based layout system.
- **Draft & Live Previews**: Preview content changes before publishing.
- **On-demand Revalidation**: Automatic frontend updates for published content.
- **SEO**: Integrated SEO management with the Payload SEO Plugin.
- **Search**: Full-text search capabilities powered by the Payload Search Plugin.
- **Redirects**: Seamless URL management with the Payload Redirects Plugin.
- **Scheduled Publishing**: Plan content publication with a jobs queue.
- **TypeScript**: Full end-to-end type safety.
- **TailwindCSS & shadcn/ui (Radix UI)**: Modern styling and UI components.
- **PostgreSQL Database**: Robust data storage with Neon.
- **Vercel Blob Storage**: Scalable asset storage. (Plans to migrate eventually)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 probably works, I've only validated on v20)
- pnpm (package manager)
- Postgres, if on local

### Local Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/chuangcaleb/fungates-superflow-foundation-website.git
    cd fungates-superflow-foundation-website
    ```

2. **Set up environment variables:**
    Copy the example environment file and fill in the necessary values.

    ```bash
    cp .env.example .env
    ```

    You need to generate `PAYLOAD_SECRET`, `CRON_SECRET`, and `PREVIEW_SECRET`. Tip, you can use the following utility:

    ```bash
    openssl rand -hex 32
    ```

    For local development, you need to first start a local PostgreSQL service.

    - Database: **Local Postgres**
    - Storage: **Local Filesystem** (`./public/media`, see `src/collections/Media.ts`)

    ```bash
    brew services start postgresql@18
    ```

3. **Install dependencies and start the development server:**

    ```bash
    pnpm install
    pnpm dev
    ```

4. **Access the application:**
    Open your browser to `http://localhost:3000` for the frontend and `http://localhost:3000/admin` for the Payload CMS admin panel.

### Deployment (Vercel)

This project is intended to be deployed in production with Vercel. Ideally integrate the Vercel services to auto-populate the environment variables into the project.

- Database: **Neon Database** (Postgres-based cloud database).
- Storage: **Vercel Blob Storage** (object storage for files).
- Provide **secrets**: `CRON_SECRET`, `PAYLOAD_SECRET`, and `PREVIEW_SECRET`.

After deployment, you can access your admin panel at `/admin` of your app URL.

Tip: In `payload.config.ts`, you can see how the  `!!process.env.VERCEL` switches the modes for database and storage options.

## Project Structure

```filetree
.
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js App Router (frontend and Payload admin routes)
│   │   ├── (frontend)/       # Frontend routes
│   │   └── (payload)/        # Payload admin routes
│   ├── blocks/               # Payload CMS blocks for the layout builder
│   ├── cms/                  # Payload CMS configurations (access, globals, migrations, plugins, search, etc.)
│   ├── collections/          # Payload CMS collection definitions
│   ├── components/           # Reusable React components
│   ├── fields/               # Custom Payload CMS fields
│   ├── globals/              # Payload CMS global definitions
│   ├── migrations/           # Migration files for database changes
│   ├── providers/            # React context providers
│   ├── styles/               # Global styles and utilities
│   └── utilities/            # Helper functions and utilities
├── payload.config.ts         # Main Payload CMS configuration
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies and scripts
└── ...                       # Other configuration files (tailwind, eslint, prettier, tsconfig, etc.)
```

## Key Concepts

### Payload CMS Configuration

The `payload.config.ts` file is the heart of the CMS, defining collections, globals, access control, and plugins tailored for website needs.

### Collections

- **Users**: Authentication-enabled collection for admin panel access and managing users with custom roles.
- **Pages**: For static pages, also supporting the custom layout builder and draft previews.
- **Posts**: For blog posts or articles, with a main rich text and draft previews.
- **Media**: Manages images, videos, and other assets.
- **Categories**: A taxonomy for grouping posts, supporting nested categories.
- **Staff**: Manages staff members, in relationships to `StaffGroups`.
- **StaffGroups**: Organizes staff members into groups.

### Globals

- **Contact**: Stores reusable global contact information.
- **Nav**: Defines the navigation structure for the entire site, consumed by nav menus and maps.

### Access Control

Basic access control is configured:

- **Users**: All registered users have access to the admin panel and to manage content.
- **Posts & Pages**: Published content is publicly accessible; but only authorised users can create, update, or delete.

These are the five user roles, in descending order of permissiveness. Each role implicitly inherits all the permissions of the roles beneath it

- **Superadmin**: Can manage other admins; otherwise has total permissions.
- **Admin**: Can manage other non-admin users.
- **Editor**: Can manage Pages (including Staff and StaffGroups).
- **User**: Can manage Posts (including Categories and Media).
- **None**: Default role. Has no special permissions.

Disambiguate these terms:

- **Visitor**: A person who views the frontend website.
- **User**: A person with a record in the Users table, able to log into the admin panel. May have any valid role. Sometimes called an "admin user" or "login user", in lowercase.
- **Admin**, or "Admin User": A person with the "Admin" role.

### Layout Builder

Enables dynamic content creation using a block-based system. Pre-configured blocks include:

- **Archive Block**: Displays a collection archive of Posts.
- **Banner**: Customizable banner sections.
- **Call To Action**: Interactive call-to-action elements.
- **Contact Block**: Displays contact information and a contact form.
- **Content**: Rich text content areas.
- **Media Block**: Displays media assets.
- **Related Posts**: Displays related blog posts.
- **Team Block**: Displays team members.

### Lexical Editor

A rich-text editor for a seamless content writing experience, supporting Payload blocks, media, and links.

### Drafts & Previews

- **Draft Preview**: Posts and Pages are draft-enabled, allowing content to be previewed before publishing. This leverages Payload's Versions with `drafts` enabled.
- **Live Preview**: Provides real-time rendering of content changes as they are being edited within the admin panel.
- **On-demand Revalidation**: Changes to published content in collections and globals automatically trigger frontend updates via Next.js's on-demand revalidation.

### SEO & Search

- **SEO**: Integrated with the official [Payload SEO Plugin](https://payloadcms.com/docs/plugins/seo) for comprehensive search engine optimization.
- **Search**: Utilizes the official [Payload Search Plugin](https://payloadcms.com/docs/plugins/search) to provide SSR search functionality.

### Redirects

Managed by the official [Payload Redirects Plugin](https://payloadcms.com/docs/plugins/redirects), allowing for the creation of 301/302 redirects for URL changes.

### Jobs & Scheduled Publishing

Content can be published or unpublished at scheduled times using Payload's [Scheduled Publish](https://payloadcms.com/docs/versions/drafts#scheduled-publish) feature, which relies on the [jobs queue](https://payloadcms.com/docs/jobs-queue/jobs) and cron schedules.

## Development Guide

### Working with Postgres

This project uses PostgreSQL. When making schema changes, it's crucial to manage migrations:

- **Local Development**: Set `push: true` by default in development for automatic schema updates. For production environments, set `push: false`.
- **Migrations**: Use `pnpm payload migrate:create` to generate migration files for schema changes, then `pnpm payload migrate` to run pending migrations onto the db.
- You may run migrations on local (seems like you need to, e.g. to rename enums), but first ensure that the database schema is reset to its last known migration state, before running migrations.

<!-- ### Working with Storage

Stub
-->
