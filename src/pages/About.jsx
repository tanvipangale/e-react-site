import React from 'react';

function About() {
  return (
    <div
      className="container"
      style={{ padding: '80px 0' }}
    >
      <div className="today">
        About Us
      </div>

      <h1 className="flash-title">
        Who We Are
      </h1>

      <div
        style={{
          maxWidth: '850px',
          lineHeight: '1.9',
          color: '#555',
          marginTop: '25px',
          fontSize: '16px'
        }}
      >
        Our platform is built to deliver a modern,
        seamless, and reliable online shopping
        experience with a strong focus on quality,
        design, and customer satisfaction.

        <br /><br />

        We carefully curate products that combine
        style, value, and functionality, ensuring
        that every customer discovers items that
        fit their lifestyle and preferences. From
        trending collections to everyday
        essentials, our goal is to make online
        shopping simple, enjoyable, and accessible.

        <br /><br />

        With a commitment to innovation, secure
        shopping, and excellent service, we
        continue to create a platform where
        customers can shop confidently and explore
        products with ease.
      </div>
    </div>
  );
}

export default About;