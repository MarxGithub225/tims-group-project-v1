import React, { useEffect, useState } from 'react'
import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: 200,
    width: 200,
    cursor: 'pointer',
    borderRadius: '8px 8px 0 0'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

function FileDropzone(props) {
    const [brdCol, setBorderColor] = useState('#eeeeee')
    const onDrop = (acceptedFiles) => {
        if(props.multiple)
        props.onChange(acceptedFiles)
        else
        props.onChange(acceptedFiles[0])
    }

    useEffect(() => {
      if(props.borderColor){
        setBorderColor(props.borderColor)
      }
    }, [props.borderColor])

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
      } = useDropzone({onDrop, maxFiles: 1, multiple: props.multiple ? true : false,  accept: props.accept ?? {'image/*': []}});
    
      const style = useMemo(() => ({
        borderColor: brdCol,
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}), 
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject,
        brdCol
      ]);

    return (
      <div >
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p style={{color: brdCol || '#bdbdbd'}} >Cliquer ou glisser ici...</p>
      </div>
    </div>
    );
}

export default FileDropzone