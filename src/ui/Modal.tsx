import Swal from "sweetalert2";

export const confirmDelete = async (onConfirm: () => Promise<void>) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleting...",
      text: "Please wait while we delete the file.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await onConfirm(); 
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error!", `There was an issue deleting the file. Details: ${error}`, "error");
    }
  }
};

export const confirmUpdate = async (onConfirm: () => Promise<void>) => {
  const result = await Swal.fire({
    title: "Update Confirmation",
    text: "Are you sure you want to update this item?",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it!",
  });

  if (result.isConfirmed) {
    Swal.fire({
      title: "Updating...",
      text: "Please wait while we update the item.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await onConfirm(); 
      Swal.fire("Updated!", "Your item has been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", `There was an issue updating the item. Details: ${error}`, "error");
    }
  }
};


export const showLoading = () => {
Swal.fire({
    title: "Please wait...",
    text: "Processing your request",
    allowOutsideClick: false,
    didOpen: () => {
    Swal.showLoading();
    },
});
};

export const showSuccess = (message: string) => {
Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    confirmButtonColor: "#3085d6",
})};

export const showError = (message: string) => {
Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonColor: "#d33",
});
};
  