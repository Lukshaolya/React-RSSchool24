import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeAllItems } from '../../store/slice';
import { CSVLink } from 'react-csv';
import { FlyoutWindowProps } from '../../types';
import styles from './Flyout.module.css';

const FlyoutWindow = ({ isOpen, closeWindow, store }: FlyoutWindowProps) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(isOpen);

  const headers = [
    { label: 'Gender', key: 'gender' },
    { label: 'URL', key: 'url' },
    { label: 'id', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Status', key: 'status' },
  ];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <>
      <div className={styles.flyout}>
        <div
          className={`${styles.flyout_container} ${isOpen ? styles.enter : styles.exit}`}
        >
          <button className={styles.flyout_btn_close} onClick={closeWindow}>
            Close
          </button>
          <p className={styles.flyout_message}>
            {store.length == 0
              ? 'You dont make a choise!'
              : `${store.length} items are selected!`}
          </p>
          <div className={styles.flyout_block_btn}>
            <button className={styles.flyout_btn} disabled={!store.length}>
              <CSVLink
                data={store}
                headers={headers}
                filename={`${store.length}_charactares.csv`}
              >
                Download
              </CSVLink>
            </button>
            <button
              className={styles.flyout_btn}
              onClick={() => dispatch(removeAllItems())}
            >
              Unselect all
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlyoutWindow;
