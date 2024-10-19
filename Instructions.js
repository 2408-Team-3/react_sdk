// Instructions:

// 1. Place this folder in your application's src folder

// 2. In the file where your top-level component is rendered (usually named main.tsx or index.jsx)
// add the following code snippet:

// import ErrorBoundary from "./ReactSDK/ErrorBoundary.jsx";
// import { globalErrorHandler } from "./ReactSDK/ErrorUtils.js";
// globalErrorHandler();

// 3. In the same file (main.tsx or index.js), wrap your top level component (< App/>)
// in <ErrorBoundary> tags:

// createRoot(document.getElementById("root")!).render(
//     <ErrorBoundary>
//       <App />
//     </ErrorBoundary>
//   );

// 4. Optional: insert these jsx tags into the return statement of any component to test:

// <button
// onClick={() => {
//   let number = 42;
//   number.toUpperCase();
// }}
// >
// Throw a test error!
// </button>
// <button
// onClick={() => {
//   throw Promise.reject("for testing: unhandled rejected promise");
// }}
// >
// Throw an unhandled rejected promise!
// </button>
