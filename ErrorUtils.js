const ERROR_SERVER_ENDPOINT = "http://localhost:5000";

export function handleErrorBaundaryError(e) {
  const { message, filename, lineno, colno, error } = e;
  const errorData = {
    handler: "ErrorBoundary",
    message,
    filename,
    lineno,
    colno,
    stack: e?.stack || null,
    timestamp: new Date().toISOString(),
    e,
  };

  console.log("React error: ", message);
  sendErrorToBackend(errorData);
}

// method for handling unhandled promise rejections
export function handlePromiseRejection(e) {
  const { reason, promise } = e;
  const errorData = {
    reason,
    handler: "window.onunhandledrejection",
    type: "Unhandled promise rejection",
    message: reason?.message || "Reason unknown",
    stack: reason?.stack || null,
    promise: promise.toString(),
    timestamp: new Date().toISOString(),
  };

  console.log(`Unhandled rejection: ${reason}\nPromise:`, promise);
  sendErrorToBackend(errorData);
}

export function sendErrorToBackend(errorData) {
  console.log(errorData);

  fetch(`${ERROR_SERVER_ENDPOINT}/api/errors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(errorData),
  })
    .then((response) => response.json())
    .then((data) => console.log("Error sent successfully:", data))
    .catch((err) => console.error("Failed to send error:", err));
}

export function globalErrorHandler() {
  window.onunhandledrejection = function (event) {
    handlePromiseRejection(event);
  };

  window.onerror = function (message, source, lineno, colno, error) {
    if (window.errorHandledByBoundary) {
      window.errorHandledByBoundary = false;
      return;
    }
    const errorData = {
      handler: "window.onerror",
      message,
      source,
      lineno,
      colno,
      stack: error?.stack || null,
      timestamp: new Date().toISOString(),
    };
    sendErrorToBackend(errorData);

    return true;
  };
}
