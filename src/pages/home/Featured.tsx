import FeaturedArticles from './Featured.FeaturedArticles';
import FeaturedCompanies from './Featured.FeaturedCompanies';
import FeaturedUsers from './Featured.FeaturedUsers';
import FeaturedVacancies from './Featured.FeaturedVacancies';

const Featured = () => {
  return (
    <section className='space-y-4 mx-4 md:mx-8'>
      <h1 className='text-xl font-semibold'>Featured</h1>

      <FeaturedCompanies />
      <FeaturedVacancies />
      <FeaturedUsers />
      <FeaturedArticles />
    </section>
  );
};

export default Featured;
