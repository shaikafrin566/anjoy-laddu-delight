# Anjoy Laddu Delight - Seller Setup Guide

## 🚀 All Notification Features Implemented

### ✅ Option 1: WhatsApp Notification
- **Mobile:** +91 8008144268
- **Auto-triggered:** When customer clicks "Place Order"
- **Features:** Instant WhatsApp message with complete order details

### ✅ Option 2: Email Notification (EmailJS)
- **Email:** nanib9269@gmail.com
- **Setup Required:** Configure EmailJS (see below)
- **Features:** Automatic email with order details

### ✅ Option 3: Database + Backend + Seller Dashboard
- **Backend:** Node.js server running on port 3000
- **Database:** JSON file storage (`server/orders.json`)
- **Dashboard:** `/seller-dashboard` - View all orders, revenue, statistics

## 📧 EmailJS Setup (For Automatic Emails)

1. **Sign up at [EmailJS](https://www.emailjs.com/)**

2. **Create Email Service:**
   - Go to Email Services
   - Add Gmail (or your preferred email provider)
   - Connect your Gmail account

3. **Create Email Template:**
   - Go to Email Templates
   - Create template with these variables:
     ```
     Subject: New Anjoy Order #{{order_id}}

     Body:
     New Order Details:

     Order ID: {{order_id}}
     Customer: {{customer_name}}
     Phone: {{customer_phone}}
     Address: {{customer_address}}
     Payment: {{payment_method}}

     Items:
     {{order_items}}

     Total: {{total_amount}}
     Delivery: {{estimated_delivery}}
     ```

4. **Get your keys:**
   - Service ID: `your_service_id_here`
   - Template ID: `your_template_id_here`
   - Public Key: `your_public_key_here`

5. **Update CheckoutPage.tsx:**
   ```typescript
   const serviceId = 'your_actual_service_id';
   const templateId = 'your_actual_template_id';
   const publicKey = 'your_actual_public_key';
   ```

## 🎯 How It Works

1. **Customer places order** → Data saved to `orders.json`
2. **WhatsApp opens** → Seller gets instant message
3. **Email sent** → Seller gets email notification (if EmailJS configured)
4. **Dashboard updated** → Seller can view all orders at `/seller-dashboard`

## 🔗 Access Points

- **Customer Website:** `http://localhost:8084/` (or current dev server port)
- **Seller Dashboard:** `http://localhost:8084/seller-dashboard`
- **Backend API:** `http://localhost:3000/api/orders`

## 📱 Testing the Flow

1. Place an order on the website
2. Check WhatsApp for instant notification
3. Check email (if configured)
4. Visit `/seller-dashboard` to see all orders

## 🛠️ Commands

```bash
# Start frontend
npm run dev

# Start backend (in separate terminal)
npm run server

# Both together (if needed)
npm run dev & npm run server
```