import swal from "sweetalert";
import { Modal } from "./UI/Modal.js";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    locateUserBtn.addEventListener("click", this.locateUserHandler);
    addressForm.addEventListener("submit", this.findAddressHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      swal("Location is not available", "please allow geolocation", "error");
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "loading location - please wait!"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (success) => {
        modal.hide();
        const coordinates = {
          lat: success.coords.latitude + Math.random() * 50,
          lng: success.coords.longitude + Math.random() * 50,
        };
        console.log(coordinates);
      },
      (error) => {
        modal.hide();
        swal("Couldn't locate you unfortunately...", error.message);
      }
    );
  }

  findAddressHandler() {}
}

new PlaceFinder();
