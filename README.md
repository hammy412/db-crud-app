Repository Link: https://github.com/hammy412/db-crud-app

Team members: Aidan Hamilton, Mia Fitzgerald, Aaron Schlossberg

Tools used:

- Backend: Node/Express
- Frontend: HTML/CSS/JavaScript
- Database: MySQL

User guide:

## Overview

This is a simple Lost Items CRUD application. The backend is a Node/Express server that exposes REST endpoints to create, read, update, and delete lost-item records stored in a MySQL database. The frontend is a small static HTML/CSS/JS UI that calls the backend API.

This guide explains how to set up and run the app locally and how to use the UI to perform CRUD operations.

---

## Prerequisites

- Node.js
- npm
- MySQL server

Make sure MySQL is running and you have credentials for a database where the app can create the `lostItems` table.

## Configure the backend

1. Create a .env file in the backend folder with the following variables (replace as needed):

```
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
PORT=5001
```

2. Install backend dependencies and start the server:

```bash
cd backend
npm install
npm run dev
```

The server listens on http://localhost:5001 by default. On successful startup you should see a console log like `Server running on http://localhost:5001` and `Connected to MySQL database`.

## Database notes

The backend expects a table named `lostItems`. A minimal table schema you can run in MySQL is:

```sql
create table lostItems (
	itemid int auto_increment primary key,
    itemname varchar(50) not null,
    ownername varchar(50),
    ownernumber varchar(20),
    itemcolor varchar(20),
    description varchar(100),
    datelost date,
    locationlost varchar(50)
);
```

Run that in your MySQL client connected to the `DB_NAME` you set in `.env`.

## Serve the frontend

The frontend is a static HTML file located in `frontend/frontend_draft.html`.

---

## API endpoints (used by the frontend)

- GET /items — list all items
- GET /items/:id — fetch a single item
- POST /items — create an item (JSON body)
- PUT /items/:id — update an item (JSON body)
- DELETE /items/:id — delete an item

All endpoints speak JSON.

---

## Using the app (CRUD workflows)

Below are short examples of how to use the UI and the corresponding API calls.

Create (Add Item)
- In the frontend form, fill in:
	- Item Name (required)
	- Owner Name
	- Owner Number
	- Item Color
	- Description
	- Date Lost (use the date picker)
	- Location Lost
- Click "Add Item". The frontend will POST the data to `/items`. On success the form will reset and the item list refreshes.

Example POST body:

```json
{
	"itemname": "Blue Backpack",
	"ownername": "Alex",
	"ownernumber": "555-1234",
	"itemcolor": "Blue",
	"description": "Small backpack with a laptop",
	"datelost": "2025-11-02",
	"locationlost": "Library"
}
```

Read (View Items)
- The UI automatically fetches all items from `GET /items` and displays them in the list/cards area. Use the list to find an item by name, owner, or date.

Update (Edit Item)
- Click the "Edit" button on an item in the list. The form will populate with the item's values and switch to "Update" mode.
- Modify fields and click "Save". The frontend will send a PUT request to `/items/:id` with the updated JSON body. On success the list refreshes.

Example PUT body (same shape as POST):

```json
{
	"itemname": "Blue Backpack (recovered)",
	"ownername": "Alex",
	"ownernumber": "555-1234",
	"itemcolor": "Blue",
	"description": "Updated description",
	"datelost": "2025-11-02",
	"locationlost": "Library"
}
```

Delete (Mark Found)
- Click the "Found" button on an item. The frontend sends a `DELETE /items/:id` request. On success the item is removed from the list.

---