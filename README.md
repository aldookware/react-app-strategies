# React UI Project

This project is a React application designed to implement a user interface with various components and pages. Below is an overview of the project structure and its key features.

## Project Structure

```
react-ui-project
├── public
│   ├── index.html         # Main HTML file serving as the entry point for the React application
│   └── favicon.ico        # Favicon for the application
├── src
│   ├── components         # Contains reusable components
│   │   ├── Header         # Header component
│   │   ├── Navigation     # Navigation component
│   │   ├── StrategyCard   # Strategy card component
│   │   ├── FilterBar      # Filter bar component
│   │   └── UploadSection   # Upload section component
│   ├── pages              # Contains different pages of the application
│   │   ├── Strategies     # Strategies page
│   │   └── Models         # Models page
│   ├── types              # TypeScript types and interfaces
│   ├── utils              # Utility functions
│   ├── App.tsx            # Main application component
│   ├── App.css            # Global styles
│   └── index.tsx          # Entry point for the React application
├── tsconfig.json          # TypeScript configuration file
└── package.json           # npm configuration file
```

## Features

- **Header Component**: Displays the header section of the UI.
- **Navigation Component**: Renders the navigation menu for easy access to different pages.
- **Strategy Card Component**: Displays individual strategy cards with relevant information.
- **Filter Bar Component**: Provides filtering options for strategies to enhance user experience.
- **Upload Section Component**: Allows users to upload files or data seamlessly.
- **Strategies Page**: Utilizes the `StrategyCard` and `FilterBar` components to display strategies.
- **Models Page**: Renders the models page with relevant content.

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd react-ui-project
npm install
```

Then, you can run the application:

```bash
npm start
```

This will start the development server and open the application in your default web browser.

## Testing

This project includes a comprehensive testing setup using Jest and React Testing Library.

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once (CI mode)
npm run test:ci

# Run tests with coverage
npm run test:coverage
```

### Testing Structure

- **Unit Tests**: Component-level testing for individual React components
- **Integration Tests**: Testing component interactions and context providers
- **Setup**: Custom test utilities with provider wrappers for realistic testing
- **Mocking**: Proper mocking of external dependencies and browser APIs

See [TESTING.md](./TESTING.md) for detailed testing documentation and best practices.

## Available Scripts