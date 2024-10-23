import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './Screen.css';
import Popup from './Popup';

const LockScreeniPad = ({ onLearnMore, isPopupVisible, onClosePopup }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDayDate, setCurrentDayDate] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
      setCurrentTime(now.toLocaleTimeString([], optionsTime));
      const optionsDayDate = { weekday: 'long' };
      setCurrentDayDate(now.toLocaleDateString('en-IN', optionsDayDate));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    const fetchBatteryStatus = async () => {
      const battery = await navigator.getBattery();
      setBatteryLevel(Math.floor(battery.level * 100));
      setIsCharging(battery.charging);
      battery.addEventListener('levelchange', () => {
        setBatteryLevel(Math.floor(battery.level * 100));
      });
      battery.addEventListener('chargingchange', () => {
        setIsCharging(battery.charging);
      });
    };

    fetchBatteryStatus();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getBatteryColor = () => {
    if (batteryLevel > 50) return 'green';
    if (batteryLevel > 20) return 'yellow';
    return 'red';
  };

  return (
    <div className="lock-screeni-pad-container">
      <Helmet>
        <title>Exported Project</title>
      </Helmet>
      {isPopupVisible && <Popup onClose={onClosePopup} onLearnMore={onLearnMore} />}
      <div className="lock-screeni-pad-lock-screeni-pad">
        <div className="lock-screeni-pad-wallpaper">
          <div className="lock-screeni-pad-options"></div>
        </div>
        <div className="lock-screeni-pad-time">
          <span className="lock-screeni-pad-time-text">{currentTime}</span>
        </div>
        <span className="lock-screeni-pad-text10">
          <span>{currentDayDate} Lucknow</span>
        </span>
        <div className="lock-screeni-pad-status-bar">
          <div className="lock-screeni-pad-left">
            <span className="lock-screeni-pad-text14">
              <span>{new Date().toLocaleDateString()}</span>
            </span>
          </div>
          <div className="lock-screeni-pad-right">
            <span className="lock-screeni-pad-text18">
              <span>{batteryLevel}%</span>
            </span>
            <div className="lock-screeni-pad-battery-icon">
              <div className="lock-screeni-pad-battery-frame">
                <div
                  className="lock-screeni-pad-battery-fill"
                  style={{
                    width: `${batteryLevel}%`,
                    backgroundColor: getBatteryColor(),
                  }}
                />
                {isCharging && (
                  <img
                    src="/external/charge.png"
                    alt="Charging Icon"
                    className="lock-screeni-pad-charging-icon"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockScreeniPad;
