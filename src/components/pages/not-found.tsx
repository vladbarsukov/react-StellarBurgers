import React, {FC} from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

type TNotFound404Props = {}
export const NotFound404: FC<TNotFound404Props> = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Oops! 404 Error</h1>
          <p>The page you requested does not exist</p>
          <p>check the address or try <Link to='/' className={styles.link}>homepage</Link></p>
        </div>
      </div>
    </div>
  );
}