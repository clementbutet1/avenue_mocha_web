import Layout from "../src/components/Layout";

const AboutPage = () => (
  <Layout title="About">
    <div className="py-16 bg-white h-screen dark:bg-black">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png" alt="image" loading="lazy" width="" height=""/>
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl dark:text-white">
              More about Avenue Mocha
            </h2>
            <p className="mt-6 text-gray-600 dark:text-white">
              Avenue Mocha is an online coffee shop that offers a unique coffee
              experience. We pride ourselves on serving the finest quality
              coffees from the most respected producers on the planet. We have a
              wide variety of coffees from different regions, all of which are
              carefully roasted to give you exceptional flavor and richness of
              taste.
            </p>
            <p className="mt-4 text-gray-600 dark:text-white">
              Our coffee is grown in a fair and sustainable manner, ensuring
              that local producers are fairly compensated for their hard work.
              We strive to minimize our environmental impact by using
              eco-friendly packaging and offering environmentally friendly
              delivery options. We are passionate about our coffee and want to
              share that passion with you. We have a wide selection of coffees
              to suit all tastes. Whether you prefer a strong, full-bodied
              coffee or a smooth, fruity coffee, we have something for you. We
              are also happy to offer organic and vegan coffee options. We also
              offer quality coffee accessories to help you enjoy your coffee at
              home, such as manual coffee grinders, plunger coffee makers and
              filter coffee makers. Join the Avenue Mocha community and discover
              the best quality coffees from around the world. Order now and
              experience the difference of superior coffee.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default AboutPage;
