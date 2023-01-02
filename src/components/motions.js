
//oes up for 1.5 sec
export const logoGoesUp = {initial:{    
    y: 500,
  },
  enter:{    
    y: -100,
    transition:{
      duration: 1500
    }
  }
}

//glow from black to green every 2 seconds
export const motionGlowText = {
    initial:{
   'text-shadow':'0 0 1px rgba(0,0,0,0)'
  },
  enter:{
    'text-shadow':'0 0 1px rgba(0,200,0,1)',
    transition:{
      duration: 2000,
      repeat:Infinity,
      reverseType: 'reverse',
    }
  }
}