# Career Advice Recommendation Platform

## Overview

The Career Advice Recommendation Platform is designed to assist users in finding suitable career paths by providing recommendations based on various factors, such as interests, academic performance, and other models. The platform leverages a Service-Oriented Architecture to ensure scalability and flexibility in its operations.

## Architecture

### Service-Oriented Architecture (SOA)
The platform is structured using a Service-Oriented Architecture, which allows for the decoupling of services and promotes modularity. Each service can be developed, deployed, and maintained independently.

### Authentication
Authentication is handled through the `auth` service, which utilizes `passport.js` with both local and Google OAuth strategies to ensure secure access for users.

### Storage
MongoDB is used as the primary database for storing user data and other application information.

## Machine Learning

A TensorFlow model is trained to provide career recommendations. The trained model is saved as a `.keras` file and integrated into the backend service.

### Model Integration
- **Backend**: The Flask framework is used to host the backend application. It serves as the RESTful API that interacts with the TensorFlow model to generate recommendations.
- **Frontend**: Angular 18 is used for developing the user interface, providing a dynamic and responsive user experience.

## Workflow

1. **User Submission**: Users input their data, such as interests and academic performance, through the Angular-based UI.
2. **Data Processing**: The input data is sent to the Flask backend, which processes the data and queries the TensorFlow model.
3. **Recommendation Generation**: The model analyzes the input data and generates career recommendations.
4. **Response Delivery**: The recommendations are sent back to the frontend and displayed to the user.



## Getting Started

To set up the platform locally, ensure you have the following installed:
- Node.js and npm (for Angular frontend)
- Python and Flask (for backend services)
- MongoDB
- TensorFlow

Follow these steps to run the application:
1. Clone the repository.
2. Set up your MongoDB database and update the connection settings in the backend.
3. Install necessary dependencies for both the frontend and backend using npm and pip, respectively.
5. Run the auth, backend and frontend services.
6. Access the application via the local URL provided by the Angular frontend.

## Contribution

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

