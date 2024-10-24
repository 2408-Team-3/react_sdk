import("source-map-support/browser-source-map-support.js").then(
  (sourceMapSupport) => {
    sourceMapSupport.install();
  }
);

import axios from "axios";

API_ENDPOINT = "https://jvcrh631c5.execute-api.us-east-1.amazonaws.com/dev";

class ErrorMonitor {
  // connecting to lambda

  constructor(projectID) {
    this.projectID = projectID;
    this.#init();
  }

  handleErrorBoundaryError(error) {
    this.#logError(error, "false");
  }

  // Private methods

  async #logError(error, handled) {
    try {
      const data = {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        handled,
        timestamp: new Date().toISOString(),
        project_id: this.projectID,
      };
      const response = await axios.post(`${API_ENDPOINT}/api/errors`, { data });
      console.log("Error sent successfully:", data);
    } catch (err) {
      console.error("Failed to send error:", err);
    }
  }

  #init() {
    window.addEventListener("error", (event) => {
      if (window.errorHandledByBoundary) {
        window.errorHandledByBoundary = false;
        return;
      }

      this.#logError.call(ErrorMonitor, event.error, "false");

      return true;
    });
  }
}

export default ErrorMonitor;
