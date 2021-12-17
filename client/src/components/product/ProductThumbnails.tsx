import React, { useEffect, useState } from 'react';

interface Props {
  urlList: string[];
}
export default function ProductThumbnails(props: Props) {
  const { urlList } = props;
  const [selection, setSelection] = useState<string>(urlList[0]);

  const showSelection = (url: string) => {
    setSelection(url);
  };

  useEffect(() => {
    setSelection(urlList[0])
  }, [urlList])
  return (
    <>
      <div className='d-flex'>
        {urlList.length > 1 &&
          urlList.map((url, index) => (
            <div
              key={index}
              className='card m-2'
              style={{ width: '6rem' }}
              onMouseEnter={() => showSelection(url)}
            >
              <img src={url} alt='' />
            </div>
          ))}
      </div>
      <div className='row'>
        <div className='col'>
          <div className='card m-2'>
            <img src={selection} alt='' />
          </div>
        </div>
      </div>
    </>
  );
}
