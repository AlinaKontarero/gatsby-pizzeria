import React from 'react';
import useLatestData from '../utils/useLatestData';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';
import { HomePageGrid } from '../styles/Grids';

const CurrentlySlicing = ({ slicemasters }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Slicemasters On</span>
    </h2>
    <p>Standing by, ready to slice you up!</p>
    {!slicemasters && <LoadingGrid count={4} />}
    {slicemasters && !slicemasters?.length && <p>No one is working now!</p>}
    {slicemasters?.length && <ItemGrid items={slicemasters} />}
  </div>
);

const HotSlices = ({ hotSlices }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Hot Slices</span>
    </h2>
    <p>Come on, buy the slice!</p>
    {!hotSlices && <LoadingGrid count={4} />}
    {hotSlices && !hotSlices?.length && (
      <p>No current slices now. Please order. </p>
    )}
    {hotSlices?.length && <ItemGrid items={hotSlices} />}
  </div>
);

const HomePage = () => {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza in the Sutherland Shire!</h1>
      <p>Open 11 am to 11pm every single day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
};

export default HomePage;
