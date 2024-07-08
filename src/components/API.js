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
