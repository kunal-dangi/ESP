import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/submissions');
            const data = await response.json();
            setSubmissions(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading Submissions...</div>;

    return (
        <div className="admin-dashboard">
            <h1 className="admin-title">Startup Submissions</h1>
            {submissions.length === 0 ? (
                <p>No submissions found.</p>
            ) : (
                <div className="submissions-grid">
                    {submissions.map((sub) => (
                        <div key={sub._id} className="submission-card">
                            <h3>{sub.companyName}</h3>
                            <div className="submission-details">
                                <p><strong>Founder:</strong> {sub.founderName}</p>
                                <p><strong>Email:</strong> {sub.businessEmail}</p>
                                <p><strong>Website:</strong> <a href={sub.website} target="_blank" rel="noopener noreferrer">{sub.website}</a></p>
                                <p><strong>Industry:</strong> {sub.industry}</p>
                                <p><strong>Product:</strong> {sub.productDescription}</p>
                                <p><strong>Target:</strong> {sub.targetAudience}</p>
                                <p><strong>Model:</strong> {sub.pricingModel}</p>
                                <p><strong>MAU:</strong> {sub.monthlyUsers}</p>
                                <p><strong>Revenue:</strong> {sub.revenueRange}</p>
                                <p><strong>Channels:</strong> {sub.customerAcquisitionChannels}</p>
                                <div className="submission-footer">
                                    <small>{new Date(sub.createdAt).toLocaleString()}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
