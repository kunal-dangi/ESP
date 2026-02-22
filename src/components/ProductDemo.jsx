import React from 'react';
import PipelineFlow from './PipelineFlow';
import './ProductDemo.css';

const ProductDemo = () => {
    return (
        <section className="section product-demo-section" id="product-demo">
            <div className="container">
                <div className="product-demo-header">
                    <h2 className="product-demo-title">How Our Engine Works</h2>
                    <p className="product-demo-subtitle">
                        A real-time visualization of how we turn social signals into qualified startup leads through our proprietary matching infrastructure.
                    </p>
                </div>

                <PipelineFlow />
            </div>
        </section>
    );
};

export default ProductDemo;
