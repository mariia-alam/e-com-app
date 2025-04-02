import { z } from "zod";

const checkoutSchema = z.object({
    shippingInfo: z.object({
        fullName: z.string().min(3, "Full name must be at least 3 characters"),
        address: z.string().min(5, "Address must be at least 5 characters"),
        city: z.string().min(2, "City must be at least 2 characters"),
        country: z.string().min(2, "Country must be at least 2 characters"),
        zipCode: z.string().regex(/^\d{4,10}$/, "Invalid zip code"),
    }),
    paymentMethod: z.enum(["creditCard", "paypal", "cod"]),
    shippingOption: z.enum(["standard", "express"]),
    discountCode: z.string().optional(),
    cardDetails: z.object({
        cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
        expirationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid expiration date (YYYY-MM-DD)"),
        cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
        cardHolder: z.string().min(3, "Cardholder name must be at least 3 characters"),
    }).optional(),
    }).refine((data) => {

    // Ensure cardDetails is provided if payment method is "creditCard"
    if (data.paymentMethod === "creditCard" && !data.cardDetails) {
        return false;
    }
    return true;
    }, { message: "Card details are required for credit card payment", path: ["cardDetails"] });

type CheckoutType = z.infer<typeof checkoutSchema>;

export { checkoutSchema, type CheckoutType };
