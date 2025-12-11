# Haru Memoirs - Frontend Feature Documentation

## 1. Project Overview
Haru Memoirs is a seasonal memoir blog inspired by the Japanese concept of "Haru" (Spring). It features a visually rich, contemplative interface for sharing stories, poetry, and letters. The application is built with Next.js and focuses on a premium, serene user experience with smooth transitions and aesthetic design elements.

## 2. Technology Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS (`globals.css`) for specific design tokens (fonts, colors, cursor).
- **Icons**: Lucide React
- **API Communication**: Native `fetch` with custom service wrappers.
- **Font**: Custom fonts (Garamond, Montserrat) integrated via `next/font` or CSS.

## 3. Key Features & Implementation

### 3.1 Blog System
The core functionality allowing users to browse and read content.

- **Unified Listing (`/blogs`)**:
    - Aggregates content from four distinct categories: *Self-Reflection*, *Journals*, *Letters*, and *Poetry*.
    - **Filtering**: Users can filter by category. The UI updates the URL query parameter (`?category=...`) for shareability.
    - **Pagination**: Implemented as page-based pagination. Fetches 9 items per page.
    - **Implementation**: `src/app/blogs/page.tsx` handles state (blogs, loading, error), filtering logic, and calls respective service functions from `src/functions/services`.

- **Individual Post View (`/blogs/[id]`)**:
    - Displays full content of a selected post.
    - **Dynamic Routing**: Uses Next.js dynamic routes `[id]`.
    - **Fetching Strategy**: Determines the correct endpoint to fetch from based on the ID or context (current implementation details might vary, typically fetches from a unified or specific endpoint).

### 3.2 Anonymous Like System
A privacy-focused engagement feature allowing users to "like" posts without creating an account.

- **Browser Fingerprinting**:
    - **Logic**: Uses a browser-specific identifier stored in `localStorage` to uniquely identifying a user session without personal data.
    - **File**: `src/lib/browserId.ts` (`getOrCreateBrowserId`).
- **Optimistic UI**:
    - The UI updates the like count immediately upon clicking, before the server response confirms the action, providing a snappy experience.
    - **Reversion**: If the API call fails, the UI reverts the count and state.
- **Persistence**:
    - Likes are permanent (cannot be unliked) to prevent spam toggling, as per business logic.
    - **File**: `src/lib/likeLogic.ts` manages the interaction between the UI and the backend API.

### 3.3 SEO & GEO (Generative Engine Optimization)
Advanced SEO setup to ensure visibility in both traditional search engines and LLM-based answers.

- **Dynamic Metadata**:
    - Centralized configuration in `src/seo/metadata.ts`.
    - Generates title, description, Open Graph, and Twitter card tags dynamically for every page.
- **JSON-LD Structured Data**:
    - Implements `BlogPosting`, `BreadcrumbList`, and `Organization` schemas for rich search results.
- **LLMs.txt**:
    - **Endpoint**: `/llms.txt`.
    - **Purpose**: A specially formatted text file for AI crawlers, summarizing the site's structure, content, and purpose to improve how LLMs index and describe the site.
    - **Implementation**: `src/app/llms.txt/route.ts` generates this file statically.

### 3.4 Contact Form
A functional contact interface for user engagement.

- **Integration**:
    - Connects to the backend via `/api/contact`.
    - **Service**: `src/functions/services/contact/contact.ts`.
    - **Validation**: Basic frontend validation before submission.

## 4. Architecture Notes
- **Service Layer Pattern**: API calls are abstracted into "services" (`src/functions/services/`) rather than being hardcoded in components. This promotes reusability and cleaner UI code.
- **Directory Structure**:
    - `src/app`: Routes and pages.
    - `src/ui`: Reusable UI components.
    - `src/lib`: Core logic and utilities (like system, browser ID).
    - `src/functions`: API service layers.
    - `src/seo`: SEO configurations and helpers.
