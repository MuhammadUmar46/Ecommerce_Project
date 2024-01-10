import React from "react";
import Layout from "../components/Layout/Layout";
import image from "../assets/image.jpg";

const About = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row bg-white-800 text-black p-8">
        <div className="md:w-1/2 mt-2 md:mt-0 mx-5">
          <img
            src={image}
            alt="image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 mr-5">
          <h2 className="text-4xl font-bold mb-4 mt-4">About Us</h2>
          <p className="text-gray-700">
            Welcome to [Exclusive Toy Store]! We are dedicated to providing a wide
            range of high-quality toys that bring joy and laughter to children
            of all ages. Our passion is to inspire creativity and imagination
            through play.
          </p>
          <p className="text-gray-700 mt-2">
            With a carefully curated selection of toys, we strive to create a
            magical and delightful experience for kids and parents alike.
            Explore our collection and discover the perfect toys for every
            occasion.
          </p>
          <button className="bg-black text-white px-4 py-2 my-4 font-bold hover:bg-gray-600">
            Explore Now
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default About;
