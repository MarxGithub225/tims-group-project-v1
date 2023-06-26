import React from "react";

function Loading() {
  return <div id="preloader">
  <div id="ctn-preloader" className="ctn-preloader">
      <div className="animation-preloader">
          <div className="spinner"></div>
          <div className="txt-loading">
              <span data-text-preloader="T" className="letters-loading">
                  T
              </span>
              <span data-text-preloader="I" className="letters-loading">
                  I
              </span>
              <span data-text-preloader="M" className="letters-loading">
                  M
              </span>
              <span data-text-preloader="S" className="letters-loading">
                  S
              </span>
          </div>
      </div>
      <div className="loader">
          <div className="row">
              <div className="col-3 loader-section section-left">
                  <div className="bg"></div>
              </div>
              <div className="col-3 loader-section section-left">
                  <div className="bg"></div>
              </div>
              <div className="col-3 loader-section section-right">
                  <div className="bg"></div>
              </div>
              <div className="col-3 loader-section section-right">
                  <div className="bg"></div>
              </div>
          </div>
      </div>
  </div>
</div>;
}

export default Loading;
