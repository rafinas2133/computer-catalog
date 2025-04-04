import Swal from "sweetalert2";

export const confirmDelete = async (onConfirm: () => void) => {
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
    onConfirm(); // Panggil fungsi yang diberikan jika user mengkonfirmasi
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
  }
};

export const confirmUpdate = async (onConfirm: () => void) => {
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
      onConfirm(); // Panggil fungsi update
      Swal.fire("Updated!", "Your item has been updated.", "success");
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
  