import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';
import SuccessModal from './SuccessModal';
import './StartupForm.css';

const StartupForm = () => {
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const [focused, setFocused] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleFocus = (index) => {
        setFocused(index);
        anime({
            targets: inputRefs.current[index].parentNode,
            scale: 1.02,
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)',
            easing: 'easeOutQuad',
            duration: 300
        });
    };

    const handleBlur = (index) => {
        setFocused(null);
        anime({
            targets: inputRefs.current[index].parentNode,
            scale: 1,
            boxShadow: 'none',
            easing: 'easeOutQuad',
            duration: 300
        });
    };

    const [formData, setFormData] = useState({
        companyName: '',
        founderName: '',
        businessEmail: '',
        website: '',
        industry: '',
        yearFounded: '',
        productDescription: '',
        targetAudience: '',
        pricingModel: '',
        monthlyUsers: '',
        revenueRange: '',
        customerAcquisitionChannels: '',
        supportEmail: '',
        responseTime: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                yearFounded: Number(formData.yearFounded),
                monthlyUsers: formData.monthlyUsers ? Number(formData.monthlyUsers) : undefined
            };

            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success || response.ok) {
                // Show Success Modal instead of Alert
                setShowSuccessModal(true);

                // Set dashboard access flags
                localStorage.setItem('startupRegistered', 'true');
                localStorage.setItem('verificationStatus', 'Pending');
                window.dispatchEvent(new Event('startupRegistered'));

                setFormData({
                    companyName: '',
                    founderName: '',
                    businessEmail: '',
                    website: '',
                    industry: '',
                    yearFounded: '',
                    productDescription: '',
                    targetAudience: '',
                    pricingModel: '',
                    monthlyUsers: '',
                    revenueRange: '',
                    customerAcquisitionChannels: '',
                    supportEmail: '',
                    responseTime: ''
                });
            } else {
                alert('Error: ' + (data.message || 'Submission failed'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
        }
    };

    return (
        <section className="request-section section" id="startup-registration" style={{ paddingTop: '8rem', minHeight: '100vh', paddingBottom: '4rem' }}>
            <SuccessModal isOpen={showSuccessModal} onClose={() => {
                setShowSuccessModal(false);
                navigate('/dashboard');
            }} />

            <div className="container form-container glass-card">
                <h2 className="section-title">Register Your Startup</h2>
                <p className="form-subtitle">Join our network and get matched with high-intent leads.</p>
                <form className="request-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Company Name</label>
                            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Inc." required ref={el => inputRefs.current[0] = el} onFocus={() => handleFocus(0)} onBlur={() => handleBlur(0)} />
                        </div>
                        <div className="form-group">
                            <label>Founder Name</label>
                            <input type="text" name="founderName" value={formData.founderName} onChange={handleChange} placeholder="Jane Doe" required ref={el => inputRefs.current[1] = el} onFocus={() => handleFocus(1)} onBlur={() => handleBlur(1)} />
                        </div>
                        <div className="form-group">
                            <label>Business Email</label>
                            <input type="email" name="businessEmail" value={formData.businessEmail} onChange={handleChange} placeholder="founder@acme.com" required ref={el => inputRefs.current[2] = el} onFocus={() => handleFocus(2)} onBlur={() => handleBlur(2)} />
                        </div>
                        <div className="form-group">
                            <label>Website</label>
                            <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://acme.com" ref={el => inputRefs.current[3] = el} onFocus={() => handleFocus(3)} onBlur={() => handleBlur(3)} />
                        </div>
                        <div className="form-group">
                            <label>Industry</label>
                            <input type="text" name="industry" value={formData.industry} onChange={handleChange} placeholder="SaaS, FinTech, Health..." required ref={el => inputRefs.current[4] = el} onFocus={() => handleFocus(4)} onBlur={() => handleBlur(4)} />
                        </div>
                        <div className="form-group">
                            <label>Year Founded</label>
                            <input type="number" name="yearFounded" value={formData.yearFounded} onChange={handleChange} placeholder="2023" required ref={el => inputRefs.current[5] = el} onFocus={() => handleFocus(5)} onBlur={() => handleBlur(5)} />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Product Description</label>
                        <textarea rows="3" name="productDescription" value={formData.productDescription} onChange={handleChange} placeholder="What does your product do?" required ref={el => inputRefs.current[6] = el} onFocus={() => handleFocus(6)} onBlur={() => handleBlur(6)}></textarea>
                    </div>

                    <div className="form-group full-width">
                        <label>Target Audience</label>
                        <input type="text" name="targetAudience" value={formData.targetAudience} onChange={handleChange} placeholder="e.g. Small Business Owners, Freelancers..." required ref={el => inputRefs.current[7] = el} onFocus={() => handleFocus(7)} onBlur={() => handleBlur(7)} />
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Pricing Model</label>
                            <select name="pricingModel" value={formData.pricingModel} onChange={handleChange} required ref={el => inputRefs.current[8] = el} onFocus={() => handleFocus(8)} onBlur={() => handleBlur(8)}>
                                <option value="">Select...</option>
                                <option value="Freemium">Freemium</option>
                                <option value="Subscription">Subscription</option>
                                <option value="One-time">One-time</option>
                                <option value="Enterprise">Enterprise</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Monthly Users</label>
                            <input type="number" name="monthlyUsers" value={formData.monthlyUsers} onChange={handleChange} placeholder="Approximate MAU" ref={el => inputRefs.current[9] = el} onFocus={() => handleFocus(9)} onBlur={() => handleBlur(9)} />
                        </div>
                        <div className="form-group">
                            <label>Revenue Range</label>
                            <select name="revenueRange" value={formData.revenueRange} onChange={handleChange} ref={el => inputRefs.current[10] = el} onFocus={() => handleFocus(10)} onBlur={() => handleBlur(10)}>
                                <option value="">Select...</option>
                                <option value="Pre-revenue">Pre-revenue</option>
                                <option value="&lt;$1k/mo">&lt;$1k/mo</option>
                                <option value="$1k-$10k/mo">$1k-$10k/mo</option>
                                <option value="$10k-$50k/mo">$10k-$50k/mo</option>
                                <option value="$50k+/mo">$50k+/mo</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Acquisition Channels</label>
                            <input type="text" name="customerAcquisitionChannels" value={formData.customerAcquisitionChannels} onChange={handleChange} placeholder="SEO, Ads, Cold Outreach..." ref={el => inputRefs.current[11] = el} onFocus={() => handleFocus(11)} onBlur={() => handleBlur(11)} />
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Support Email</label>
                            <input type="email" name="supportEmail" value={formData.supportEmail} onChange={handleChange} placeholder="support@acme.com" ref={el => inputRefs.current[12] = el} onFocus={() => handleFocus(12)} onBlur={() => handleBlur(12)} />
                        </div>
                        <div className="form-group">
                            <label>Response Time</label>
                            <select name="responseTime" value={formData.responseTime} onChange={handleChange} ref={el => inputRefs.current[13] = el} onFocus={() => handleFocus(13)} onBlur={() => handleBlur(13)}>
                                <option value="">Select...</option>
                                <option value="Within 1 hour">Within 1 hour</option>
                                <option value="Same Day">Same Day</option>
                                <option value="24 hours">24 hours</option>
                                <option value="48 hours+">48 hours+</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">Register Startup</button>
                </form>
            </div>
        </section>
    );
};

export default StartupForm;

