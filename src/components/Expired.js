export const splitDataByExpiry = (data) => {
  const today = new Date();
  const activeCoupons = [];
  const expiredCoupons = [];

  data.forEach((el) => {
    const expiryDate = new Date(el.expiredAt);
    if (expiryDate >= today) {
      activeCoupons.push(el);
    } else {
      expiredCoupons.push(el);
    }
  });

  return { activeCoupons, expiredCoupons };
};
