import React from 'react';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import SuccessStories from '../components/SuccessStories';
import Achivements from '../components/Achivements';
import Plans from '../components/Plans';
import FAQ from '../components/FAQ';
import Calculators from '../components/Calculators';
import Footer from '../components/Footer';
import Facilities from '../components/Facilities';
import AboutUs from '../components/AboutUs';

const Home = () => {
    return (
      <div>
        <section id="home"><Hero/></section>
        <section id="about"><AboutUs/></section>
        <section id="whyus"><WhyUs/></section>
        <section id="stories"><SuccessStories/></section>
        <section id="facilities"><Facilities/></section>
        <section id="achievements"><Achivements/></section>
        <section id="plans"><Plans/></section>
        <section id="faq"><FAQ/></section>
        <section id="calculators"><Calculators/></section>
      </div>
    );
  };
  

export default Home;