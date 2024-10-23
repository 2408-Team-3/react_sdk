import("source-map-support/browser-source-map-support.js").then(
  (sourceMapSupport) => {
    sourceMapSupport.install();
  }
);

import axios from "axios";

class ErrorMonitor {
  static #APIendpoint = "http://localhost:8000";

  constructor(projectID) {
    this.projectID = projectID;
    this.#init();
  }

  handleErrorBoundaryError(error) {
    this.#logError(error, "false");
  }

  // Private methods

  async #logError(error, handled) {
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
    console.log("data object to be sent", data);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/errors",
        data
      );

      console.log("response:", response.data);

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
