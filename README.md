# Email Service API Application

## Overview
The **Email Service API** is a robust and scalable application designed to handle email-related operations. This service provides features such as sending emails, managing email templates, handling bulk email requests, and ensuring reliable delivery with retry mechanisms. Built with modern technologies, the API ensures performance, security, and ease of integration.

## Features
- **Send Emails:** Send transactional and promotional emails efficiently.
- **Bulk Email Support:** Process and send bulk email requests seamlessly.
- **Email Templates:** Create, store, and manage email templates for consistent communication.
- **Retry Mechanism:** Ensures email delivery by retrying in case of failures.
- **Logging and Monitoring:** Tracks all email activities for debugging and analytics.

## Tech Stack
### Backend
- **Node.js**: For handling API logic and asynchronous operations.
- **Express.js**: To build a scalable and modular REST API.
- **MongoDB**: Database for storing email templates and logs.
- **Nodemailer**: For sending emails with customizable options.

### Frontend 
- **React.js**: For managing a user-friendly dashboard to monitor email activities.
- **Tailwind CSS**: For responsive and sleek UI design.

## Screenshots

Below are screenshots showcasing the application:

1. **Home Page**  
   ![Home Page](https://i.ibb.co/HK9PsSm/screencapture-email-service-api-psi-vercel-app-Home-2025-01-24-22-54-10.png)

2. **Login**  
   ![Login](https://i.ibb.co/2Pw46j4/image.png)

3. **UserPage**  
   ![UserPage](https://i.ibb.co/MD6VyNs/image.png)

4. **AdminPage**  
   ![AdminPage](https://i.ibb.co/NjYGSB6/image.png)

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (v14+)
- npm or yarn
- MongoDB
- Docker (optional for containerization)

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd email-service-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   EMAIL_SERVICE=<email-service-provider>
   EMAIL_USER=<your-email-username>
   EMAIL_PASS=<your-email-password>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the API at `http://localhost:5000`.

### Deployment
- Deploy the application to Vercel by configuring the `vercel.json` file:
  ```json
  {
    "version": 2,
    "builds": [
      { "src": "index.js", "use": "@vercel/node" }
    ],
    "routes": [
      { "src": "/.*", "dest": "/index.js" }
    ]
  }
  ```

## API Documentation

### Base URL
- Local: `http://localhost:5000`
- Production: `<your-deployment-url>`

### Endpoints

#### 1. Send Email
**POST** `/api/send`
- **Description:** Send a single email.
- **Request Body:**
  ```json
  {
    "to": "recipient@example.com",
    "subject": "Subject of the email",
    "body": "<html><body>Content of the email</body></html>",
    "cc": ["cc@example.com"],
    "bcc": ["bcc@example.com"]
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Email sent successfully."
  }
  ```

#### 2. Create Email Template
**POST** `/api/templates`
- **Description:** Save a new email template.
- **Request Body:**
  ```json
  {
    "name": "WelcomeTemplate",
    "subject": "Welcome to our service!",
    "body": "<html><body>Welcome, {{name}}!</body></html>"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Template created successfully."
  }
  ```

#### 3. Fetch All Templates
**GET** `/api/templates`
- **Description:** Retrieve all email templates.
- **Response:**
  ```json
  [
    {
      "_id": "template-id",
      "name": "WelcomeTemplate",
      "subject": "Welcome to our service!",
      "body": "<html><body>Welcome, {{name}}!</body></html>"
    }
  ]
  ```

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
- **Developer:** Satya Suranjeet Jena
- **Email:** [satyajena911@gmail.com](mailto:sjofficiala@gmail.com)
- **GitHub:** [Satyasuranjeet](https://github.com/Satyasuranjeet)

---
Thank you for using the Email Service API! If you encounter any issues or have feedback, feel free to reach out.

