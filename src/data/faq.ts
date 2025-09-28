export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FAQItem[] = [
  {
    id: "how-does-it-work",
    question: "How does it work?",
    answer: "After purchasing, you will receive access to an account with the premium subscription already purchased. You'll be able to access your profile and enjoy all premium features immediately.",
    category: "General"
  },
  {
    id: "is-this-safe",
    question: "Is this safe?",
    answer: "Yes, this is completely safe. Our method of obtaining subscriptions is completely legal and complies with service providers' Terms of Service, ensuring the safety of your account. You can check our reviews where we have 500+ five-star reviews from previous customers.",
    category: "Safety"
  },
  {
    id: "can-i-use-personal-account",
    question: "Can I get the subscription on my personal account?",
    answer: "For most services, you can only use the subscription on the account we provide, as getting the subscription on your personal account may result in your subscription getting cancelled due to household policies. However, for some services like Google One, we can apply the subscription directly to your existing account.",
    category: "Account"
  },
  {
    id: "warranty-policy",
    question: "What is your warranty policy?",
    answer: "Every order is backed by our full warranty and money-back guarantee. You're covered with a full warranty on every product you purchase from us. If your subscription stops working before the end of its term, we'll restore it or refund you.",
    category: "Warranty"
  },
  {
    id: "refund-policy",
    question: "What is your refund policy?",
    answer: "We offer a warranty-backed refund policy to keep you fully protected. If you don't receive your subscription, you'll get a full refund — no questions asked. We provide no-questions-asked refunds if your subscription ever stops working.",
    category: "Refunds"
  },
  {
    id: "how-cheap",
    question: "How can you offer such cheap prices?",
    answer: "We are able to sell our products and subscriptions for cheaper through the use of regional pricing. This allows us to offer savings of up to 80% off retail prices while maintaining 100% genuine subscriptions.",
    category: "Pricing"
  },
  {
    id: "delivery-time",
    question: "How long does delivery take?",
    answer: "For new accounts, we will create the account, purchase the subscription, and deliver the account details to your email within 24 hours. For existing account upgrades, the process is usually completed immediately after purchase.",
    category: "Delivery"
  },
  {
    id: "support",
    question: "What kind of support do you provide?",
    answer: "We provide 24/7 Discord support with real-time ticketing so you're never left on read. Our support team is always available to help with any issues or questions you may have.",
    category: "Support"
  },
  {
    id: "account-security",
    question: "How secure are the accounts?",
    answer: "Account security is our top priority. For services like Netflix, no one will be able to access your profile as it requires a PIN code for anyone else to login, and you'll be able to change the PIN code to whatever you'd like. You also have full warranty for the entire duration of the subscription.",
    category: "Security"
  },
  {
    id: "legal-compliance",
    question: "Is this legal?",
    answer: "Yes, using our service is completely legal and safe. Our method of obtaining subscriptions is completely legal and complies with all service providers' Terms of Service, ensuring the safety and legitimacy of your subscriptions.",
    category: "Legal"
  },
  {
    id: "existing-subscription",
    question: "What if I already have an active subscription?",
    answer: "That's not a problem. If your account is currently on a monthly plan, we'll cancel the rebilling for your active subscription and apply the yearly subscription. This ensures you don't get double-charged and can enjoy the benefits immediately.",
    category: "Account"
  },
  {
    id: "trustpilot-reviews",
    question: "Do you have customer reviews?",
    answer: "Yes! You can check our Trustpilot Reviews where we have 500+ five-star reviews from our previous customers. We've helped over 50,000 savvy shoppers slash their subscription bills while maintaining quality service.",
    category: "Reviews"
  }
];

export const faqCategories = [
  "All",
  "General",
  "Safety",
  "Account",
  "Warranty",
  "Refunds",
  "Pricing",
  "Delivery",
  "Support",
  "Security",
  "Legal",
  "Reviews"
];