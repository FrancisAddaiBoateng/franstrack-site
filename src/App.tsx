import React, { useEffect, useMemo, useState } from "react";
import {
  Check,
  Shield,
  Zap,
  BarChart3,
  Cookie as CookieIcon,
  Mail,
  Phone,
  Globe,
  ArrowRight,
  Map as MapIcon,
  Users
} from "lucide-react";
import { motion } from "framer-motion";


// ===== Utilities =====
const cx = (...cls: Array<string | false | null | undefined>) => cls.filter(Boolean).join(" ");
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

// ===== UI Primitives =====
const Container: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className, children }) => (
  <section id={id} className={cx("mx-auto max-w-7xl px-6 lg:px-8", className)}>{children}</section>
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary"; as?: "a"; href?: string }> = ({ variant = "primary", as, href, className, children, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F1B2A]";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500 border border-gray-600"
  };

  if (as === "a" && href) {
    return (
      <a href={href} className={cx(baseStyles, variants[variant], className)}>{children}</a>
    );
  }
  return <button className={cx(baseStyles, variants[variant], className)} {...props}>{children}</button>;
};

const Card: React.FC<{ className?: string; children: React.ReactNode; hover?: boolean }> = ({ className, children, hover = false }) => (
  <div className={cx("rounded-2xl bg-gray-800 p-6 shadow-lg", hover && "hover:shadow-xl transition-shadow duration-300", className)}>{children}</div>
);


// ===== Cookie Consent =====
const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    if (!isBrowser) return;
    setVisible(!localStorage.getItem("ft_cookie_ok"));
  }, []);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[95%] md:w-[720px] rounded-2xl bg-gray-800 text-white/90 p-6 shadow-2xl border border-gray-700"
    >
      <div className="flex items-start gap-4">
        <CookieIcon className="mt-0.5 h-5 w-5 text-blue-400" />
        <div className="flex-1">
          <p className="text-sm font-medium">We Value Your Privacy</p>
          <p className="text-sm text-white/70 mt-1">
            We use essential cookies to operate our platform and analytics to improve our service. 
            See our <a className="text-blue-400 hover:text-blue-300 underline" href="#privacy">Privacy Policy</a>.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => { if (isBrowser) localStorage.setItem("ft_cookie_ok", "1"); setVisible(false); }} 
            className="text-sm"
          >
            Accept
          </Button>
          <a href="#privacy" className="rounded-xl px-4 py-2 text-sm border border-gray-600 hover:bg-gray-700 transition-colors">
            Manage
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// ===== SEO JSON-LD =====
const JsonLD: React.FC = () => {
  const json = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Franstrack",
    description: "Professional GPS tracking and fleet management solutions with real-time vehicle monitoring and analytics.",
    url: "https://franstrack.com",
    logo: "https://franstrack.com/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Liverpool",
      addressCountry: "UK"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-151-000-0000",
      contactType: "customer service"
    }
  }), []);
  if (!isBrowser) return null;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
};

// ===== Sections =====
const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    if (!isBrowser) return;
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <a className="flex items-center gap-3 group" href="#home">
            <div className="h-10 w-10 rounded-xl bg-blue-600 grid place-items-center font-bold text-white group-hover:scale-105 transition-transform">
              F
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Franstrack
            </span>
          </a>
          
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium" aria-label="Primary">
            {['Solutions', 'Pricing', 'Features', 'Customers', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-white/80 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <a href="#login" className="text-white/80 hover:text-white transition-colors">Login</a>
            <Button as="a" href="#demo" className="text-sm">
              Get Started
            </Button>
          </nav>

          <button className="lg:hidden rounded-xl px-3 py-2 border border-gray-600 hover:bg-gray-800 transition-colors">
            Menu
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero: React.FC = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 pt-20">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
    
    <Container className="py-20 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-400 mb-6">
            <Shield className="h-4 w-4" />
            Trusted by UK Fleets Since 2020
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Smarter Fleet
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Management</span>
          </h1>
          
          <p className="mt-6 text-xl text-white/70 leading-relaxed max-w-2xl">
            Real-time GPS tracking, advanced analytics, and comprehensive fleet management solutions 
            designed to optimize your operations and reduce costs.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button as="a" href="#pricing" className="text-lg px-8 py-4">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="secondary" as="a" href="#demo" className="text-lg px-8 py-4">
              View Demo
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            {[
              { icon: Shield, label: "UK Data Centers", sub: "GDPR Compliant" },
              { icon: Zap, label: "Real-time", sub: "5s Updates" },
              { icon: BarChart3, label: "Analytics", sub: "Live Insights" },
              { icon: Users, label: "24/7 Support", sub: "Always Available" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-500/10 p-2">
                  <item.icon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">{item.label}</div>
                  <div className="text-white/60 text-xs">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <Card className="overflow-hidden border border-gray-700">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-white/60">Live Dashboard Preview</div>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-white font-semibold">Active Vehicles</div>
                  <div className="text-green-400 text-sm font-medium">12/12 Online</div>
                </div>
                
                <div className="space-y-3">
                  {['Delivery Van #25', 'Service Truck #08', 'Executive Car #03'].map((vehicle, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                        <span className="text-white text-sm">{vehicle}</span>
                      </div>
                      <div className="text-white/60 text-sm">62 mph</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="flex justify-between text-sm">
                    <div className="text-white/60">Total Distance Today</div>
                    <div className="text-white font-semibold">427 mi</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Container>
  </section>
);

const Stats: React.FC = () => (
  <Container className="py-16 lg:py-24">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { value: "98%", label: "Uptime SLA" },
        { value: "24/7", label: "Support" },
        { value: "15s", label: "Update Speed" },
        { value: "99.9%", label: "Data Accuracy" }
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-white/60 text-sm font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </Container>
);

const Features: React.FC = () => (
  <Container id="features" className="py-16 lg:py-28">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
        Comprehensive Fleet
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Solutions</span>
      </h2>
      <p className="text-xl text-white/70 max-w-3xl mx-auto">
        Everything you need to manage your fleet efficiently, reduce costs, and improve customer service.
      </p>
    </motion.div>

    <div className="grid lg:grid-cols-3 gap-8">
      {[
        {
          icon: MapIcon,
          title: "Real-time Tracking",
          description: "Live vehicle locations with 5-30 second updates and historical route playback.",
          features: ["Live GPS Tracking", "Route Playback", "Geofencing", "Speed Monitoring"]
        },
        {
          icon: BarChart3,
          title: "Advanced Analytics",
          description: "Comprehensive reports and insights to optimize fleet performance and reduce costs.",
          features: ["Fuel Analytics", "Driver Behavior", "Maintenance Alerts", "Cost Reports"]
        },
        {
          icon: Shield,
          title: "Safety & Security",
          description: "Protect your assets with instant alerts and comprehensive security features.",
          features: ["SOS Alerts", "Theft Prevention", "Tamper Alerts", "Driver Safety"]
        }
      ].map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card hover className="h-full border border-gray-700">
            <div className="rounded-xl bg-blue-500/10 p-3 w-12 h-12 flex items-center justify-center mb-6">
              <feature.icon className="h-6 w-6 text-blue-400" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-white/70 mb-6">{feature.description}</p>
            
            <ul className="space-y-3">
              {feature.features.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-white/80">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      ))}
    </div>
  </Container>
);

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  

  const plans = [
    {
      name: "Essential",
      description: "Perfect for small fleets",
      monthlyPrice: 12,
      annualPrice: 10,
      features: [
        "Live GPS Tracking",
        "Basic Reports",
        "Email Support",
        "30-day History",
        "Mobile App Access"
      ]
    },
    {
      name: "Professional",
      description: "For growing businesses",
      monthlyPrice: 18,
      annualPrice: 15,
      featured: true,
      features: [
        "All Essential features",
        "Advanced Analytics",
        "Priority Support",
        "90-day History",
        "API Access",
        "Custom Reports",
        "SMS Alerts"
      ]
    },
    {
      name: "Enterprise",
      description: "For large operations",
      monthlyPrice: 25,
      annualPrice: 20,
      features: [
        "All Professional features",
        "Unlimited History",
        "24/7 Phone Support",
        "Dedicated Account Manager",
        "Custom Integrations",
        "SLA Guarantee",
        "White-label Options"
      ]
    }
  ];

  return (
    <Container id="pricing" className="py-16 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
          Simple, Transparent
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Pricing</span>
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          No hidden fees. No long-term contracts. Scale up or down as your business needs change.
        </p>
      </motion.div>

      <div className="flex justify-center mb-12">
        <div className="bg-gray-800 rounded-xl p-1 inline-flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              billingCycle === 'monthly' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              billingCycle === 'annual' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Annual (Save 20%)
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative ${plan.featured ? 'lg:scale-105 z-10' : ''}`}
          >
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
            )}
            
            <Card className={`h-full border-2 ${plan.featured ? 'border-blue-500' : 'border-gray-700'} relative overflow-hidden`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60">{plan.description}</p>
                
                <div className="mt-6">
                  <span className="text-4xl font-bold text-white">
                    £{billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-white/60 ml-2">per vehicle/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white/80">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                as="a" 
                href="#contact" 
                className={`w-full ${plan.featured ? '' : 'variant="secondary"'}`}
              >
                Get Started
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-12"
      >
        <p className="text-white/60">
          All plans include UK data hosting, GDPR compliance, and our 14-day free trial.
          <br />
          Need a custom solution? <a href="#contact" className="text-blue-400 hover:text-blue-300 underline">Contact our team</a>
        </p>
      </motion.div>
    </Container>
  );
};

const CTA: React.FC = () => (
  <Container className="py-16 lg:py-24">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 lg:p-12 text-center"
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
        Ready to Transform Your Fleet Management?
      </h2>
      <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
        Join hundreds of UK businesses that trust Franstrack for their fleet tracking needs. 
        Start your 14-day free trial today.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          as="a" 
          href="#pricing" 
          className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
        >
          Start Free Trial
        </Button>
        <Button 
          variant="secondary" 
          as="a" 
          href="#demo" 
          className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
        >
          Schedule Demo
        </Button>
      </div>
    </motion.div>
  </Container>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-900 border-t border-gray-800">
    <Container className="py-12 lg:py-16">
      <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-blue-600 grid place-items-center font-bold text-white">
              F
            </div>
            <span className="text-xl font-bold text-white">Franstrack</span>
          </div>
          <p className="text-white/60 mb-6 leading-relaxed">
            Professional GPS tracking and fleet management solutions for UK businesses.
          </p>
          <div className="flex gap-4">
            {[Mail, Phone, Globe].map((Icon, index) => (
              <div key={index} className="rounded-lg bg-gray-800 p-2 hover:bg-gray-700 transition-colors cursor-pointer">
                <Icon className="h-5 w-5 text-white/70" />
              </div>
            ))}
          </div>
        </div>

        {[
          {
            title: "Solutions",
            links: ["Live Tracking", "Fleet Analytics", "Driver Safety", "Fuel Management", "Maintenance"]
          },
          {
            title: "Company",
            links: ["About Us", "Customers", "Blog", "Careers", "Contact"]
          },
          {
            title: "Legal",
            links: ["Privacy Policy", "Terms of Service", "GDPR", "Security", "Compliance"]
          }
        ].map((column, index) => (
          <div key={index}>
            <h4 className="font-semibold text-white mb-4">{column.title}</h4>
            <ul className="space-y-3">
              {column.links.map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="text-white/60 text-sm">
          © {new Date().getFullYear()} Franstrack. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-white/60">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms</a>
          <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </Container>
  </footer>
);

export default function FranstrackSite() {
  
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <JsonLD />
      <Nav />
      
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <CTA />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
}