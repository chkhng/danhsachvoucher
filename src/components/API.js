import axios from 'axios';

const baseURL = 'http://150.95.104.20:9997';

export const fetchVouchers = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/deal-promotion/get-all-deal-promotion?pageNum=1&pageSize=8&isGetAll=false&statuses=ACTIVE`,
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch all coupons', error);
    throw error;
  }
};

export const getMyVoucher = async (type, userId, accessToken) => {
  try {
    const response = await axios.post(
      `${baseURL}/user/get-my-voucher`,
      { type, userId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch vouchers', error);
    throw error;
  }
};
export const getMyExVoucher = async (type, userId, accessToken) => {
  try {
    const response = await axios.post(
      `${baseURL}/user/get-my-voucher`,
      { type, userId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch vouchers', error);
    throw error;
  }
};

export const registerVoucherWithPhone = async (
  dealPromotionId,
  email,
  phone,
  registerName,
  accessToken,
) => {
  try {
    const response = await axios.post(
      `${baseURL}/deal-promotion/register-use-deal-promotion
      `,
      { dealPromotionId, email, phone, registerName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to register coupon', error);
    throw error;
  }
};

export const sendOTP = async (phone, accessToken) => {
  try {
    const response = await axios.post(
      `${baseURL}/user/send-otp-customer`,
      { phone, source: 'DANG_KY_OTP' },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to send OTP', error);
    throw error;
  }
};

export const verifyOTP = async (phone, otp, accessToken) => {
  try {
    const response = await axios.post(
      `${baseURL}/user/verify-otp-customer`,
      { phone, otp, source: 'DANG_KY_OTP' },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to verify OTP', error);
    throw error;
  }
};
export const getLocation = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/location/get-location?pageNum=1&pageSize=1&isGetAll=true&userId=b9a14cc9-14f3-4376-aae8-43e1197beffe&isActive=true&businessTypeIds=f123bdd1-f2e3-446c-af4f-c7a030a0269a&businessTypeIds=f123bdd1-f2e3-446c-af4f-c7a030a0269a&businessTypeIds=f123bdd1-f2e3-446c-af4f-c7a030a0269a&businessTypeIds=f123bdd1-f2e3-446c-af4f-c7a030a0269a&businessTypeIds=f123bdd1-f2e3-446c-af4f-c7a030a0269a&businessTypeIds=f123bdd1-f2e3-446c-af4f-c7a030a0269a&sortBy=NEAREST&businessId=4d2b67be-ebc9-45c4-b025-10a820608233`,
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch all coupons', error);
    throw error;
  }
};
