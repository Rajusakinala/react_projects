import axios from "axios";

const endpoint = "http://127.0.0.1:8080/v1";

// axios instance
const client = axios.create({
  baseURL: endpoint,
});

const requests = {
  init: (token) => ({
    login: async (loginData) => {
      try {
        const { data } = await client.post(`/user/login`, loginData);
        return data;
      } catch (error) {
        console.log(error?.response?.data);
        throw error?.response?.data;
      }
    },
    logout: async () => {
      try {
        const { data } = await client.patch(`/user/logout`, null, {
          headers: { authorization: `Bearer ${token}` },
        });

        return data;
      } catch (error) {
        console.log(error?.response?.data);
        throw error?.response?.data;
      }
    },
    register: async (registerData) => {
      try {
        const { data } = await client.post("/user/register", registerData);
        return data;
      } catch (error) {
        if (error?.response?.data?.code === 11000) throw "User already exists";
        console.log(error?.response?.data?.details?.[0]?.message);
        throw error?.response?.data?.details?.[0]?.message;
      }
    },
    newToken: async (refreshToken) => {
      try {
        const { data } = await client.post("/user/new-access-token", {
          refreshToken,
        });
        return data;
      } catch (error) {
        console.log(error?.response?.data?.details?.[0]?.message);
        throw error?.response?.data?.details?.[0]?.message;
      }
    },
    userData: async () => {
      try {
        const { data } = await client.get("/user/details", {
          headers: { authorization: `Bearer ${token}` },
        });
        return data;
      } catch (error) {
        console.log("error: ", error);
        console.log(error?.response?.data?.details?.[0]?.message);
        throw error?.response?.data?.details?.[0]?.message;
      }
    },
    sendOTP: async (email) => {
      try {
        const { data } = await client.get(`user/forgot-password/${email}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        return data;
      } catch (error) {
        console.log("error: ", error);
        console.log(error?.response?.data);
        throw error?.response?.data;
      }
    },
    verifyOtp: async (cred) => {
      try {
        const { data } = await client.post(`user/verify-otp/`, cred);
        return data;
      } catch (error) {
        console.log("error: ", error);
        console.log(error?.response?.data);
        throw error?.response?.data;
      }
    },
    resetPassword: async (cred) => {
      try {
        const { data } = await client.patch(`user/reset-password/`, cred);
        return data;
      } catch (error) {
        console.log("error: ", error);
        console.log(error?.response?.data?.details?.[0]?.message);
        throw error?.response?.data?.details?.[0]?.message;
      }
    },
    allUsers: async () => {
      try {
        const { data } = await client.get("user/all-users", {
          headers: { authorization: `Bearer ${token}` },
        });
        return data;
      } catch (error) {
        console.log("error: ", error);
        console.log(error?.response?.data);
        throw error?.response?.data;
      }
    },
    removeUser: async (id) => {
      try {
        const { data } = await client.delete("user/remove", {
          headers: { authorization: `Bearer ${token}` },
          data: { id },
        });
        return data;
      } catch (error) {
        console.log("error: ", error);
        console.log(error?.response?.data);
        throw error?.response?.data;
      }
    },
    addInactiveUser: async (userData) => {
      try {
        const { data } = await client.post(
          "user/add-inactive-user",
          { ...userData },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        return data;
      } catch (error) {
        console.log("error: ", error);
        console.log(error?.response?.data);
        throw error?.response?.data;
      }
    },
    changePassword: async (cred) => {
      try {
        const { data } = await client.patch(
          "user/change_password",
          { ...cred },
          { headers: { authorization: `Bearer ${token}` } }
        );
        return data;
      } catch (error) {
        console.log("error: ", error);
        console.log(error?.response?.data);
        throw error?.response?.data;
      }
    },
    editUserData: async (data) => {
      try {
        const { data } = await client.patch(
          "user/edit",
          { ...data },
          { headers: { authorization: `Bearer ${token}` } }
        );
        return data;
      } catch (error) {
        console.log("error: ", error);
        console.log(error?.response?.data);
        throw error?.response?.data;
      }
    },
  }),
};

export default requests;
