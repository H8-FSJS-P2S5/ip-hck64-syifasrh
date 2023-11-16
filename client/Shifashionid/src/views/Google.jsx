import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const GoogleButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
                console.log(credentialResponse);
              // console.log(credentialResponse.credential);
              // Memanggil backend dengan token ID Google
              const { data } = await axios.post(
                "http://localhost:3000/auth/google",
                {
                  code: credentialResponse.credential, // Send code, not access token
                }
              );
              // Simpan token dari server ke local storage atau state management
              console.log(data, "kredensial");
              localStorage.setItem("access_token", data);
              navigate("/");
            } catch (error) {
              console.error("Login failed:", error.message);
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      </GoogleOAuthProvider>
    </>
  );
};
