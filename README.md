# Digifest 2024 - Part of SMK Telkom Malang's Dis Natalies

Welcome to **Digifest 2024**! This web application is designed to manage and display information for competitions, built using the latest technologies to ensure high performance and a great user experience.

- **Next.js 14**: The cutting-edge framework for fast, server-rendered React applications.
- **Prisma**: An ORM for interacting with the MySQL database, enabling easy data access and management.
- **MySQL**: A robust relational database to store competition information.
- **NextAuth.js**: Provides secure user authentication with built-in support for OAuth and JWT.

## Tech Stack

- **Frontend**: Next.js 14, React
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MySQL
- **Authentication**: NextAuth.js

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/digifest-2024.git
   cd digifest-2024
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Setup the environment variables. Create a `.env` file in the root of the project and add the following:

   ```bash
   DATABASE_URL="mysql://username:password@localhost:3306/dbname"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ......
   ```

4. Set up the Prisma schema and push it to the database:

   ```bash
   npm run prisma:push
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Scripts

- **`npm run dev`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production.
- **`npm run start`**: Starts the production server.
- **`npm run prisma:studio`**: Opens Prisma Studio for viewing and editing your database in a browser.
- **`npm run prisma:migrate`**: It's an alias for `npx prisma migrate dev`, but using the .env.local env file.
- **`npm run prisma:push`**: It's an alias for `npx prisma push`, but using the .env.local env file.

## Project Structure

```
.
├── prisma/                   # Prisma schema and migrations
├── public/                   # Static assets (images, etc.)
├── src/
│   ├── app/                  # Next.js pages and main folder(includes API routes)
│   ├── utils/                # Utilities
│   ├── lib/                  # Helper libraries
|   ├── database/             # Database interaction (queries)
|   ├── types/                # Types for TypeScript usages
|   ├── middleware.ts         # Middleware
├── .env                      # Environment variables
├── next.config.js            # Next.js configuration
├── README.md                 # Project documentation
```

## Authentication

Digifest 2024 uses **NextAuth.js** to handle authentication, supporting various providers like Google, GitHub, and more. Ensure you configure the `.env` file correctly with the required credentials.

## Prisma & Database

Prisma is used to manage the MySQL database. The schema is defined in `prisma/schema.prisma`, and you can generate database migrations using Prisma CLI commands. Use `npm run prisma:studio` to interact with your database visually.

## Contribution

Feel free to open issues and submit pull requests. Make sure to follow the contribution guidelines provided in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Authors
- Kusindra Aji Rabbany (Developer)
- Ahsan Awadullah Azizan (Developer)
- Moch. Gilang Ramadhan (UI/UX Designer)
