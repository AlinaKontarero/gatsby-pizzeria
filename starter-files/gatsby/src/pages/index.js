import React from 'react';
import useLatestData from '../utils/useLatestData'

const CurrentlySlicing = () => (
  <div>
    <p>Currently Slicing </p>
  </div>
);

const HotSlices = () => (
  <div>
    <p>Hot Slices </p>
  </div>
);

export default function HomePage() {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza in the Sutherland Shire!</h1>
      <p>Open 11 am to 11pm every single day</p>
      <div>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  );
}
