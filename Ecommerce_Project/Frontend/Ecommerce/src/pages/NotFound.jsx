import React from "react";
import Layout from "../components/Layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const NotFound = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Layout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="not-found"
      >
        <h2>404 - Page Not Found</h2>
        <p>Oops! The page you are looking for might be in another castle.</p>
        <Link to="/">Go Home</Link>
      </motion.div>
    </Layout>
  );
};

export default NotFound;
