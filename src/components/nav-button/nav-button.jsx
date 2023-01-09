import React from 'react';
import styles from './nav-button.module.css';
const NavButton = ({IconComponent, type, description}) => {

  if (type === "primary") {
    return (
      <div className='pl-5 pr-5 pt-4 pb-4'>
        <button className={styles.button}>
          <IconComponent type={"primary"}/>
          <div className='pl-2'>
            <h2 className="text text_type_main-default">{description}</h2>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className='pl-5 pr-5 pt-4 pb-4'>
      <button className={styles.button}>
        <IconComponent type={"secondary"}/>
        <div className='pl-2'>
          <h2 className="text text_type_main-default text_color_inactive">{description}</h2>
        </div>

      </button>
    </div>
  );
};

export default NavButton;