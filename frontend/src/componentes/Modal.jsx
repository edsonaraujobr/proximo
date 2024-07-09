  import React from 'react'
  const background_STYLE={
    position: 'fixed',
    top:'0',
    bottom:'0',
    left:'0',
    right:'0',
    backgroundColor:'rgb(0,0,0,0.7)',
    zIndex:'1000'
  }

  const modal_STYLE={
    position: 'fixed',
    top:'30%',
    left:'50%',
    transform:'translate(-50%,-50%)',
    width:'370px',  
    height:'250px',
    borderRadius:'15px',
    overflow:'hidden',
    textAlign:'center',
    zIndex:'1000',
    background: 'linear-gradient(to bottom, #0f172a, #1e293b)', 
    paddingTop: '0.5rem', 
    display: 'inline-flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'flex-start'
  }

  export default function Modal({isOpen,children, customStyles = {} }) {

    const combinedModalStyle = { ...modal_STYLE, ...customStyles };

      if(isOpen){
        return (
        <div style={background_STYLE}>
          <div style={combinedModalStyle}>{children}</div>
        </div>
        )
      }
      return null;
      
  }
