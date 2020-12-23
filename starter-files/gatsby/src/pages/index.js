import React from 'react';
import useLatestData from '../utils/useLatestData';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';

const CurrentlySlicing = ({ slicemasters }) => (
  <div>
    {!slicemasters && <LoadingGrid count={4} />}
    {slicemasters && !slicemasters?.length && <p>No one is working now!</p>}
    {/* <p>Currently Slicing </p> */}
  </div>
);

const HotSlices = ({ hotSlices }) => (
  <div>
    {!hotSlices && <LoadingGrid count={4} />}
    {hotSlices && !hotSlices?.length && (
      <p>No current slices now. Please order. </p>
    )}
    {/* <p>Hot Slices </p> */}
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
