import axios from "axios";

export const login = async ({ email, pswd }, rememberMe) => {
    try {
        const response = await axios.post(
            "https://apidoc.rheel.ng/admin/auth/signin",
            { email, pswd },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status === 200) {
            const { token } = response.data;

            if (rememberMe) {
                localStorage.setItem("authToken", token); // Store token persistently
            } else {
                sessionStorage.setItem("authToken", token); // Store for session only
            }

            // Wait for storage update before redirecting
            setTimeout(() => {
                window.location.href = "/";
            }, 100);
        }
    } catch (error) {
        console.error("Login failed:", error.response ? error.response.data : error.message);
        return null;
    }
};


export const logout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    window.location.href = "/login";
};
