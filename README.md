
---

# Workflow Management System

## Description
This Workflow Management System is a full-stack application built using **Next.js** and **TypeScript**, aimed at managing workflows for a company. The system supports user roles like **Admin** and **User**, with functionalities such as CRUD operations for items, user authentication with JWT, and theme customization.

The app was developed by **Kiratipat.S** for the **DEVPOOL-PEA-2024** initiative.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Authentication Flow](#authentication-flow)
- [Protected Routes](#protected-routes)
- [Development Notes](#development-notes)

## Technologies Used
- **Next.js 14.2.7**
- **TypeScript**
- **React Hot Toast** (For error/success notifications)
- **JWT Stateless Authentication** (With cookie-based tokens)
- **Tailwind CSS** (For styling)
- **Zod** (Input validation)
- **AuthContext & ItemStatusContext** (Context API for managing authentication and item statuses)

## Features
- **User Authentication:** JWT-based authentication with cookies.
- **CRUD Operations:** Full CRUD for managing workflow items.
- **Role-Based Access Control:** Differentiated access for Manager as Admin and Accountant as User roles.
- **Theme Support:** Dark/Light mode with `ThemeProvider`.
- **Protected Routes:** Only authenticated users can access certain routes.
- **Notifications:** Success/error messages using React Hot Toast.
- **Item Status Tracking:** Context-driven tracking of pending, approved, and rejected items.

## Installation

### Prerequisites
- Node.js (v18+)
- Next.js (v14.2.7)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Kiratopat-s/workflow-fe
   cd workflow-fe
   ```

2. **Install Dependencies**
   ```bash
   npm install -g @pnpm/exe
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:2024
   ```

4. **Run Development Server**
   ```bash
   pnpm idt
   ```

5. **Access the App**
   Open your browser and navigate to `http://localhost:8000`.

## Project Structure
```
.eslintrc.json
.gitignore
.hintrc
README.md
next.config.mjs
package-lock.json
package.json
pnpm-lock.yaml
postcss.config.mjs
[public]
    ├── next.svg
    └── vercel.svg
[src]
    ├── [app]
        ├── [(auth)]
            ├── [login]
                └── page.tsx
            └── [signup]
                └── page.tsx
        ├── [(item)]
            ├── [add]
                └── page.tsx
            └── [edit]
                └── [[id]]
                    └── page.tsx
        ├── [about]
            └── page.tsx
        ├── favicon.ico
        ├── globals.css
        ├── layout.tsx
        ├── loadging.tsx
        └── page.tsx
    ├── [components]
        ├── FlexibleForm.tsx
        ├── ThemeProvider.tsx
        ├── [auth]
            └── SignupForm.tsx
        ├── [budget]
            ├── AmountInput.tsx
            ├── BudgetForm.tsx
            ├── QuantityInput.tsx
            └── TitleInput.tsx
        ├── [dashboard]
            └── ItemRow.tsx
        ├── [home]
            ├── HomeBanner.tsx
            └── HomeTypeWriter.tsx
        └── [navbar]
            └── NavBar.tsx
    ├── [context]
        ├── AuthContext.tsx
        └── ItemStatusContext.tsx
    ├── [enum]
        ├── Item.ts
        └── Path.ts
    ├── [interface]
        ├── Auth.ts
        └── Item.ts
    ├── middleware.ts
    ├── [services]
        ├── Signin.ts
        ├── Signup.ts
        └── [item]
            └── Items.ts
    ├── [type]
        ├── User.ts
        └── [zod]
            ├── Auth.ts
            └── Item.ts
    └── [utils]
        └── debounce.tsx
tailwind.config.ts
tsconfig.json
```

### Key Files
- **`AuthContext.tsx`**: Manages user authentication, token storage, and state.
- **`ItemStatusContext.tsx`**: Provides status updates for items like Pending, Approved, and Rejected.
- **`NavBar.tsx`**: Displays navigation options based on the user's authentication status and role.

## Environment Variables

Ensure the following environment variables are configured correctly:

- `NEXT_PUBLIC_API_URL`: Public API URL for the frontend to communicate with the backend.

## Authentication Flow

- The app uses **JWT** for user authentication.
- Upon login, the server responds with a JWT, which is stored in cookies.
- The **AuthContext** decodes this token, checks expiration, and sets the user's authentication status.
- Users are automatically redirected to the login page if their token is invalid or expired.

### Key Functions

- `login(token: string)`: Handles the login by decoding the JWT and setting the user's state.
- `logout()`: Clears the user session and redirects to the login page.

## Protected Routes

Certain routes are protected to ensure that only authenticated users have access. Here's how protection is enforced:

- **Middleware**: The application checks for a valid JWT token in cookies before allowing access to the following routes:
  - `/add`: For adding new items (accessible by Managers).
  - `/edit`: For editing items.
  - `/profile`: For viewing and editing user profile information.
  - `/`: The root page that is the main dashboard for authenticated users.

If the user is not authenticated, they are redirected to `/about`.

## Development Notes

1. **SSR & Client-Side Hydration**:
   The project uses **server-side rendering (SSR)** for components like `layout.tsx`, but maintains client-side features like **React Hot Toast** and **AuthContext** for dynamic updates.
   
2. **Handling JWT Expiry**:
   The JWT tokens are decoded using the `jwt-decode` library, and token expiration is managed by comparing the `exp` field with the current time. If expired, the user is automatically logged out and redirected to the login page.

3. **React Hot Toast**:
   Success and error notifications are managed using **react-hot-toast**. Customize toast messages in the `layout.tsx` file.

4. **Context API**:
   The app uses **React's Context API** to handle both authentication and item status. This ensures that state is globally available across all components without prop drilling.

## Future Improvements

- **Role Management**: Enhance the role-based access control system to allow more granular permissions.
- **Performance Optimization**: Further optimize server-side rendering to improve load times for authenticated users.




