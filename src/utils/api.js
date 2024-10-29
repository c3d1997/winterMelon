import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import { router } from "@/router";

let proxy_api_url = __API_URL__;
// 多用途
function createAuthHeaders() {
  try {
    const accessToken = getCookie("accessToken");
    console.log("Token found:", accessToken);

    if (!accessToken) {
      throw new Error("Access token not found in cookies");
    }

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } catch (error) {
    console.error("Error creating auth headers:", error);
    throw error;
  }
}
export function getCookie(name) {
  function extractCookie(cookieString, cookieName) {
    const value = `; ${cookieString}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return undefined;
  }

  return extractCookie(document.cookie, name);
}

export function setCookies(accessToken, expiredAt) {
  console.log("set cookie");
  const expiryDate = new Date(expiredAt).toUTCString();
  document.cookie = `accessToken=${accessToken}; expires=${expiryDate}; path=/`;
  document.cookie = `exp=${expiredAt}; expires=${expiryDate}; path=/`;
  console.log(document.cookie, "document.cookie");
}

// 單用途
// 發送驗證碼
export async function api_send_verify_code(data) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${proxy_api_url}/api/v1/api_send_verify_code`,
      data,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error api_send_verify_code:", error);
    return error.response.data;
  }
}
// 驗證手機號碼
export async function verify_account(data) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${proxy_api_url}/api/v1/verify_account`,
      data,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error verify_account:", error);
    return error.response.data;
  }
}
// 驗證手機號碼
export async function set_mbti(data) {
  try {
    const headers = createAuthHeaders();
    const response = await axios.put(`${proxy_api_url}/api/v1/set_mbti`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error set_mbti:", error);
    return error.response.data;
  }
}
// 取得使用者資訊
export async function get_member_info() {
  try {
    const headers = createAuthHeaders();
    const response = await axios.get(
      `${proxy_api_url}/api/v1/get_member_info`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get_member_info:", error);
    return error.response.data;
  }
}
