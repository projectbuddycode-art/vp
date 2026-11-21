export type CheckoutResult = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export function openRazorpayCheckout(options: {
  key: string;
  orderId: string;
  amountInr: number;
  name: string;
  contact: string;
}) {
  return new Promise<CheckoutResult>((resolve, reject) => {
    const start = () => {
      const Razorpay = (window as Window & { Razorpay?: new (config: object) => { open: () => void } }).Razorpay;
      if (!Razorpay) {
        reject(new Error("missing"));
        return;
      }
      const checkout = new Razorpay({
        key: options.key,
        amount: options.amountInr * 100,
        currency: "INR",
        order_id: options.orderId,
        name: "STHAPATYA",
        prefill: { name: options.name, contact: options.contact },
        handler: (response: CheckoutResult) => resolve(response),
        modal: { ondismiss: () => reject(new Error("closed")) },
      });
      checkout.open();
    };
    if ((window as Window & { Razorpay?: unknown }).Razorpay) {
      start();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = start;
    script.onerror = () => reject(new Error("script"));
    document.body.appendChild(script);
  });
}
