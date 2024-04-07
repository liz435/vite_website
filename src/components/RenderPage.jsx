// Assuming these imports are correctly set
import React from 'react';
import '../template.css';
import { useSelector, useDispatch } from 'react-redux';
import { hideContent } from '../actions';
import { useContext } from 'react';

const NavigationComponent = () => {
  const dispatch = useDispatch();

  const handleNavigationClick = () => {
    dispatch(hideContent());
  };

  return (
    <button onClick={handleNavigationClick}>
      BACK
    </button>
  );
};

const RenderPage = () => {
  const isVisible = useSelector(state => state.content.isVisible);
  const selectedSphereInfo = useSelector(state => state.selectedSphereInfo); // Assuming this comes from your Redux state

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className='container'>
        <div className='container2'>
          <div className='first-col'>
            <div className='title'>
              {selectedSphereInfo.title}
              <div>
                bcni2ob2nei2obv2o
              </div>
            </div>
            <div className='viewport'>
              {/* Viewport content here */}
            </div>
          </div>
        </div>

        {/* <div className='intro'>
          Tools: {selectedSphereInfo.tool}
        </div> */}
      </div>
      <div className='grid'>
        <img className='image' src='src/assets/SoundWave/4.png' alt="" />
      </div>
      <NavigationComponent />
    </>
  );
};

export default RenderPage;
