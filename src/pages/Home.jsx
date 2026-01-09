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

const Home = () => {
    return (
      <div>
        <section id="home"><Hero /></section>
        <section id="about"><WhyUs/></section>
        <section id="stories"><SuccessStories/></section>
        <section id="facilities"><Facilities/></section>
        <section id="achievements"><Achivements/></section>
        <section id="plans"><Plans/></section>
        <section id="faq"><FAQ/></section>
        <section id="calculators"><Calculators/></section>
        <section id="footer"><Footer/></section>
      </div>
    );
  };
  

export default Home;