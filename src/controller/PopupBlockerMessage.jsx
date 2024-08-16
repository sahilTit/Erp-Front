import React from 'react';

const PopupBlockerMessage = () => {
  return (
    <div>
      <p>
        Pop-ups are required for certain features. Please enable pop-ups for this site.
      </p>
      <p>
        Instructions for enabling pop-ups in:
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95472" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/pop-blocker-settings-exceptions-troubleshooting" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
          {/* Add instructions for other browsers */}
        </ul>
      </p>
    </div>
  );
};

export default PopupBlockerMessage;