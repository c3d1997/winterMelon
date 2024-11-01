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
// 使用者增加收集物
export async function get_collection() {
  try {
    const headers = createAuthHeaders();
    const response = await axios.get(`${proxy_api_url}/api/v1/get_collection`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error get_collection:", error);
    return error.response.data;
  }
}
// 使用者完成第一次任務
export async function completed_first_task() {
  try {
    const headers = createAuthHeaders();
    const response = await axios.get(
      `${proxy_api_url}/api/v1/completed_first_task`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error completed_first_task:", error);
    return error.response.data;
  }
}
// 遊戲一完成回報
export async function game_one_check(data) {
  try {
    const headers = createAuthHeaders();
    const response = await axios.post(
      `${proxy_api_url}/api/v1/game_one_check`,
      data,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error game_one_check:", error);
    return error.response.data;
  }
}
// 遊戲二完成回報
export async function game_two_check(data) {
  try {
    const headers = createAuthHeaders();
    const response = await axios.post(
      `${proxy_api_url}/api/v1/game_two_check`,
      data,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error game_two_check:", error);
    return error.response.data;
  }
}
// 設定使用者資訊
export async function set_all_info(data) {
  try {
    const headers = createAuthHeaders();
    const response = await axios.post(
      `${proxy_api_url}/api/v1/set_all_info`,
      data,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error set_all_info:", error);
    return error.response.data;
  }
}
// 核銷獎品
export async function write_off(data) {
  try {
    const headers = createAuthHeaders();
    const response = await axios.post(
      `${proxy_api_url}/api/v1/write_off`,
      data,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error write_off:", error);
    return error.response.data;
  }
}
// 重新開始遊戲
export async function restart_game() {
  try {
    const headers = createAuthHeaders();
    const response = await axios.get(`${proxy_api_url}/api/v1/restart_game`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error restart_game:", error);
    return error.response.data;
  }
}
// 重複遊玩取得禮物
export async function get_gift() {
  try {
    const headers = createAuthHeaders();
    const response = await axios.get(`${proxy_api_url}/api/v1/get_gift`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error get_gift:", error);
    return error.response.data;
  }
}
