import axios from "axios";

// api senere
const API_BASE_URL = "http://localhost:5000/api/users";

// til at deaktivere/aktivere bruger
export const toggleUserStatus = async (userId, newStatus) => {
  try {
    // kommenteret ud for nu
    // const response = await axios.patch(`${API_BASE_URL}/${userId}/status`, {
    //   activeStatus: newStatus,
    // });
    // return response.data;

    // test
    await new Promise((res) => setTimeout(res, 300));
    return { success: true, userId, activeStatus: newStatus };
  } catch (error) {
    console.error("Error toggling user status:", error);
    throw error;
  }
};
