import { bottombarLinks } from '@/constants';
import {Link, useLocation}  from 'react-router-dom';
import { Button } from '../ui/button';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react'
import { useState } from 'react';
import { useTheme } from '../ui/theme-provider';
const Bottombar = () => {
  const {pathname}  = useLocation();
  const [addButtonIsExpanded, setAddButtonIsExpanded] = useState(false);
  const {theme} = useTheme();
  const imageButtonName = `imagebutton ${theme}`;
  const videoButtonName = `videobutton ${theme}`;
  const liveStreamButtonName = `livestreambutton ${theme}`;
  const imageContainterButtonName = `bottombar-addimagebutton ${theme}`;
  const videoContainterButtonName = `bottombar-addvideobutton ${theme}`;
  const liveStreamContainterButtonName = `bottombar-livestreambutton ${theme}`;

  useGSAP(() =>{
    gsap.from('.bottombar-link', {
      duration: 0.5,
      y: 20,
      opacity: 0,
      delay: 1,
      stagger: 0.1,
    })
    gsap.to('.addbutton', {
      color: '#000',
      delay: 0.5,
      opacity: 1,
    })
  })

  const expandAddButton = () => {
    if(!addButtonIsExpanded){
      gsap.to('.bottombar-addbutton', {
        duration: 0.2,
        opacity: 1,
        backgroundColor:'black',
        border: '2px solid #FFF',
        delay: 0.2,
        stagger: 0.1,
      })
      gsap.to('.bottombar-addimagebutton', {
        duration: 0.5,
        y: -90,
        x:-120,
        opacity: 1,
        delay: 0,
        stagger: 0.1,
      })

      gsap.to('.bottombar-addvideobutton', {
        duration: 0.5,
        y: -100,
        x: 0,
        opacity: 1,
        delay: 0.4,
        stagger: 0.1,
      })
      gsap.to('.bottombar-livestreambutton', {
        duration: 0.5,
        y: -90,
        x:120,
        opacity: 1,
        delay: 0.5,
        stagger: 0.1,
      })
      gsap.to('.addbutton', {
        rotate: 45,
        delay: 0.2,
        color: '#FFF',
      })
      setAddButtonIsExpanded(true)
    } else {
    gsap.to('.bottombar-addbutton', {
      duration: 0.5,
      y:0,
      backgroundColor:'#F9F0FF',
      delay: 0.5,
    })
    gsap.to('.addbutton', {
      color: '#000',
      rotate: 0,
      delay: 0.5,
    })
    gsap.to('.bottombar-addimagebutton', {
      duration: 0.5,
      y: 0,
      x:0,
      opacity: 1,
      delay: 0.5,
      stagger: 0.1,
    })
    gsap.to('.bottombar-addvideobutton', {
      duration: 0.5,
      y: 0,
      x:0,
      opacity: 1,
      delay: 0.4,
      stagger: 0.1,
    })
    gsap.to('.bottombar-livestreambutton', {
      duration: 0.5,
      y: 0,
      x:0,
      opacity: 1,
      delay: 0.3,
      stagger: 0.1,
    })
    setAddButtonIsExpanded(false)
  }
  }
  return (
    <>
      <section className='bottom-bar'>
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
              <li
              key={link.label}
              className={(`bottombar-link group rounded-full ${
                  isActive && 'bg-primary-500'
              }`)}
              >
              <Link
                  to={link.route}
                  className='flex gap-4 items-center p-4 px-10 rounded-full'
              >
                  <img 
                  src={link.imgURL} 
                  alt={link.label} />
                  <p className={`group-hover:invert ${isActive ? 'text-black' : 'text-white'}`}>{link.label}</p>
                  </Link>
              </li>
          )
          })}
          <Button onClick={expandAddButton} className='bottombar-addbutton'>
            <div className="addbutton">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
              </svg>
            </div>
          </Button>
          <Button className={imageContainterButtonName}>
            <div className={imageButtonName}>
              <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clip-rule="evenodd"/>
              </svg>
            </div>
          </Button>
          <Button className={videoContainterButtonName}>
            <div className={videoButtonName}>
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 11-6-2V9l6-2v10Z"/>
              </svg>
            </div>
          </Button>
          <Button className={liveStreamContainterButtonName}>
            <div className={liveStreamButtonName}>
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
              </svg>
            </div>
          </Button>
      </section>
    </>
  )
}

export default Bottombar
