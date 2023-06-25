import React from 'react'
import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
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

    const onDrop = (acceptedFiles) => {
        if(props.multiple)
        props.onChange(acceptedFiles)
        else
        props.onChange(acceptedFiles[0])
    }

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
      } = useDropzone({onDrop, maxFiles: 1, multiple: props.multiple ? true : false,  accept: {'image/*': []}});
    
      const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);

    return (
      <div >
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Cliquer ou glisser une image ici...</p>
      </div>
    </div>
    );
}

export default FileDropzone