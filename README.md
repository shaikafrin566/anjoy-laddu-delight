# Anjoy Laddu Delight

A modern e-commerce application for selling delicious laddus with React, TypeScript, and Vite.

## Features

- 🛒 Shopping cart with delivery charges
- 💳 Multiple payment options (Paytm, PhonePe, Google Pay, Cash on Delivery)
- 📱 QR code payments
- 🚚 Dynamic delivery charges (₹50 for 1 item, ₹25 for 2+ items)
- 📧 Email notifications
- 💬 WhatsApp order integration
- 🎨 Modern UI with Tailwind CSS and shadcn/ui

## Delivery Charges

- **1 item**: ₹50 delivery charge
- **2 or more items**: ₹25 delivery charge

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Tailwind CSS, shadcn/ui, Radix UI
- **Backend**: Express.js, Node.js
- **Payment Integration**: UPI, EmailJS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shaikafrin566/anjoy-laddu-delight.git
cd anjoy-laddu-delight
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Start the backend server (in a separate terminal):
```bash
npm run server
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_UPI_ID=8008144268@ybl
VITE_API_BASE_URL=http://localhost:3000
SELLER_EMAIL=nanib9269@gmail.com
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

The project is configured with `vercel.json` for automatic deployment.

### Build

```bash
npm run build
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start backend server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/       # React context (CartContext)
├── data/          # Static data (laddus)
├── pages/         # Page components
└── ui/           # shadcn/ui components
server/
├── server.js     # Express server
└── orders.json   # Orders data
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push
5. Create a Pull Request

## License

This project is licensed under the MIT License.
