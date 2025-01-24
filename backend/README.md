# Edu-Admin Backend

This is the backend service for the Edu-Admin application. It provides APIs for managing educational administration tasks.

## Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/iyefreedy/edu-admin.git
   cd edu-admin/backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   NODE_ENV=development
   PORT=3000
   DATABASE_URL="file:./dev.db"
   ```

   or copy `.env.example`

   ```sh
   cp .env.example .env
   ```

4. Migrate database schema
   ```sh
   npx prisma db push
   ```

## Running the Application

1. Start the server:

   ```sh
   npm run dev
   ```

2. The server will be running at `http://localhost:3000`.

## API Examples

For API examples with sample requests and responses
[Postman](https://www.postman.com/bold-meadow-120941/workspace/edu-admin/collection/10557371-f9055ffc-9264-46c9-8ecb-b5ef51bf6cbd?action=share&creator=10557371)
