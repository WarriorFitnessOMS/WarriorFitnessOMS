import React from 'react';
import Hero from '../../components/publicWeb/Hero';
import WhyUs from '../../components/publicWeb/WhyUs';
import SuccessStories from '../../components/publicWeb/SuccessStories';
import Achivements from '../../components/publicWeb/Achivements';
import Plans from '../../components/publicWeb/Plans';
import FAQ from '../../components/publicWeb/FAQ';
import Calculators from '../../components/publicWeb/Calculators';
import Facilities from '../../components/publicWeb/Facilities';
import AboutUs from '../../components/publicWeb/AboutUs';

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