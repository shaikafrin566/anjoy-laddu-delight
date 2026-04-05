import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-warm-dark text-primary-foreground py-12 mt-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-2xl font-bold text-gold mb-3">Anjoy</h3>
          <p className="text-sm opacity-80">Handcrafted date laddus made with love and the finest dry fruits. Pure, natural, and delicious.</p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm opacity-80">
            <Link to="/" className="block hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/menu" className="block hover:opacity-100 transition-opacity">Menu</Link>
            <Link to="/contact" className="block hover:opacity-100 transition-opacity">Contact Us</Link>
            <Link to="/seller-dashboard" className="block hover:opacity-100 transition-opacity">Seller Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-sm opacity-80">
            <p>📞 8008144268</p>
            <p>✉️ nanib9269@gmail.com</p>
            <p>📍 Hyderabad, India</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-60">
        © 2025 Anjoy. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
